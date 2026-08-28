# Soul of Lahore

An immersive cinematic website that takes you on a journey through the soul of
Lahore - its food, monuments, sounds and stories. Built with Next.js and shippable
to a local Kubernetes cluster with its own Prometheus/Grafana/Loki monitoring stack.

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Three.js / GSAP / Lenis for the cinematic experience
- Supabase (Postgres) for visitor reviews
- Docker (multi-stage standalone build)
- Minikube + Kubernetes with HPA
- Prometheus, Grafana and Loki for monitoring and logging

## Architecture

```
                     +---------------------------+
                     |   GitHub Actions (CI/CD)  |
                     |  ci.yml  docker-push.yml  |
                     +-------------+-------------+
                                   | build & push image
                                   v
        +----------------------------------------------+
        |  Docker Hub  (atikaaa/soul-of-lahore)        |
        +----------------------------------------------+
                                   |
                                   v  (pull / image load)
+----------------------------------------------+       +-------------------------+
|  Minikube cluster                             |       |  Supabase (cloud)      |
|                                              |       |  reviews + anon key    |
|  cinem-app (Deployment + Service + HPA)      |       +------------+------------+
|  /api/health /api/reviews -- kubectl ------> |                    ^
|                                              |                    | public REST
|  monitoring ns:                              |                    |
|    prometheus + kube-state-metrics +         |                    |
|    node-exporter                             |                    |
|    grafana (dashboards)                      |                    |
|    loki + promtail (pods logs)               |                    |
+----------------------------------------------+                    |
                                                                     |
  Browser <----- localhost:3000 / 3080 (port-forward) ---------------------------------+
```

## Getting started

### Prerequisites

- Node.js 18+
- Docker Desktop (Windows) or Docker inside WSL
- Minikube + kubectl for Kubernetes deploys

### 1. Environment variables

```bash
cp .env.example .env.local
```

Fill in your Supabase project URL and anon key. `.env.local` is gitignored.

### 2. Run locally (Windows)

```powershell
npm install
.\start.ps1
```

The site is served at http://localhost:3000. `start.ps1` builds, prints your
LAN IP for testing on other devices, and only restarts its own process on re-run.

Without the script, the same via npm:

```bash
npm run dev      # development server
npm run build    # production build
npm run start    # serve the production build on :3000
```

### 3. Tests

```bash
npm test
```

Builds the app, boots `next start` on a spare port and smoke-tests `/api/health`
and the home page.

## Docker

```bash
docker build -f docker/Dockerfile \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=... \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=... \
  -t atikaaa/soul-of-lahore .
docker run --rm -p 3000:3000 atikaaa/soul-of-lahore
```

The Dockerfile is multi-stage: deps -> build -> minimal standalone runner running
as the `node` user.

## Deploying to Minikube

From the Linux WSL distro (as root):

```bash
wsl -d kali-linux -u root -- bash deploy.sh
```

`deploy.sh`:

1. Sources `.env.local` and builds the image with the `NEXT_PUBLIC_*` build args
2. Loads the image into Minikube
3. `kubectl apply -f k8s/` (Deployment, Service, HPA)
4. Waits for the rollout to finish

Verify:

```bash
kubectl get deploy,svc,hpa
kubectl port-forward svc/cinem-app 8080:80
curl http://localhost:8080/api/health
```

## Monitoring

The stack in the `monitoring` namespace lets you watch the app and the nodes:

| Service            | URL                                  | Credentials     |
| ------------------ | ------------------------------------ | --------------- |
| Grafana            | http://localhost:3001 (port-forward) | admin / admin   |
| Prometheus         | http://localhost:9091 (port-forward) | -               |
| Loki               | http://localhost:3101 (port-forward) | -               |

Common port-forwards (from WSL):

```bash
kubectl port-forward --address 0.0.0.0 svc/cinem-app -n default 3080:80
kubectl port-forward --address 0.0.0.0 svc/grafana -n monitoring 3001:3000
kubectl port-forward --address 0.0.0.0 svc/prometheus -n monitoring 9091:9090
kubectl port-forward --address 0.0.0.0 svc/loki -n monitoring 3101:3100
```

The Grafana dashboards cover app health, request/HTTP metrics, resource usage and
Loki-powered application logs.

> **Note:** in this sandbox deployment the Prometheus/Loki volumes are `emptyDir`,
> so metrics and logs reset whenever the pod restarts. For durable storage use a
> real PV/PVC or a managed service.

## CI/CD

Two GitHub Actions workflows live in `.github/workflows`:

- **ci.yml** - lint + build + smoke test on every push/PR to `main`
- **docker-push.yml** - builds and pushes the image to Docker Hub on `main`

Required repository secrets:

| Secret                       | Purpose                                    |
| ---------------------------- | ------------------------------------------ |
| `DOCKER_USERNAME`            | Docker Hub account                          |
| `DOCKER_PASSWORD`            | Docker Hub access token (prefer a PAT)      |
| `NEXT_PUBLIC_SUPABASE_URL`   | Supabase project URL (build arg)            |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase publishable anon key (build arg) |

Set them under **Settings -> Secrets and variables -> Actions**.

## Troubleshooting

- **Port 3000 already in use** - `start.ps1` only stops the process serving the
  app on port 3000; stop other servers manually if something else holds the port.
- **Minikube node restarts (exit 255)** - happens when Docker runs nested inside
  WSL. Restart it: `minikube start --driver=docker --force`, then re-run
  `deploy.sh`.
- **App doesn't come up after deploy** - check image availability and probes:
  `kubectl describe pod -l app=cinem-app` and `kubectl logs -l app=cinem-app`.
- **No logs in Grafana Loki panel** - confirm promtail is running and the app pod
  forwards logs: `kubectl -n monitoring get pods`, `kubectl -n monitoring logs deploy/promtail`.