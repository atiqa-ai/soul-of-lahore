# Soul of Lahore

An immersive cinematic website that takes you on a journey through Lahore - its
food, monuments, sounds and stories. I built the site with Next.js and then spent
a few weeks learning Docker/Kubernetes/monitoring and wiring up the whole thing to
run on a Minikube cluster with its own Prometheus + Grafana + Loki stack.

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Three.js / GSAP / Lenis for the cinematic feel
- Supabase (Postgres) for visitor reviews
- Docker (multi-stage standalone build)
- Minikube + Kubernetes (Deployment, Service, HPA)
- Prometheus + Grafana + Loki for monitoring and logs

## Architecture (as I understand it)

```
                     +---------------------------+
                     |  GitHub Actions           |
                     |  ci.yml + docker-push.yml |
                     +-------------+-------------+
                                   | builds + pushes image
                                   v
        +----------------------------------------------+
        |  Docker Hub:  atikaaa/soul-of-lahore        |
        +----------------------------------------------+
                                   ^
                                   |
        +--------------------------+--------------------------+
        |  Minikube cluster       |                          |
        |                         |                          |
        |  cinem-app              |   monitoring ns:         |
        |  (Deployment+Service)   |   prometheus             |
        |  (HPA 1-4 replicas)     |   grafana (dashboards)   |
        |  /api/health            |   loki + promtail        |
        |  /api/reviews --------returns> Supabase (cloud)    |
        +-----------------------------------------------------+
                                    ^
                                    |
  Browser <--- localhost:3000 / 3080 (kubectl port-forward)
```

I drew this from what I actually run, it is not exact to the network packets but
it is how I keep it in my head.

## Getting started

### Prerequisites

- Node.js 18+
- Docker (I run it inside WSL Kali)
- Minikube + kubectl (for the k8s deploy)

### 1. Environment variables

```bash
cp .env.example .env.local
```

Fill in your Supabase project URL + anon key. `.env.local` is gitignored, I never
commit it (learned that one the hard way).

### 2. Run locally on Windows

```powershell
npm install
.\start.ps1
```

This builds the app, starts it on http://localhost:3000 and prints your LAN IP so
you can test on your phone. It only restarts its own process if you re-run it,
it does not touch other node stuff on the machine.

Manually it is just:

```bash
npm run dev      # dev server
npm run build    # production build
npm run start    # serve the build on :3000
```

### 3. Tests

```bash
npm test
```

Builds the app, starts it on port 3011 and smoke-checks /api/health plus the home
page. It is a basic smoke test, not a real test suite - that is on my todo list.

## Docker

```bash
docker build -f docker/Dockerfile \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=... \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=... \
  -t atikaaa/soul-of-lahore .
docker run --rm -p 3000:3000 atikaaa/soul-of-lahore
```

The Dockerfile has 3 stages: install deps, build the app, then a small runtime
stage that only copies the standalone output. The app runs as the `node` user,
not root.

## Deploying to Minikube

From the Linux WSL distro (as root):

```bash
wsl -d kali-linux -u root -- bash deploy.sh
```

deploy.sh does:

1. reads .env.local and passes the NEXT_PUBLIC_* values as docker build args
2. builds the image
3. loads it into minikube
4. kubectl apply -f k8s/ (deployment, service, hpa)
5. waits for the rollout to finish

To check after deploying:

```bash
kubectl get deploy,svc,hpa
kubectl port-forward svc/cinem-app 8080:80
curl http://localhost:8080/api/health
```

To reach the app from Windows I keep a kubectl port-forward running, so the same
site is at http://localhost:3080.

## Monitoring

The monitoring stack lives in the `monitoring` namespace:

| Service      | URL                                  | Credentials     |
| ------------ | ------------------------------------ | --------------- |
| Grafana      | http://localhost:3001 (port-forward) | admin / admin   |
| Prometheus   | http://localhost:9091 (port-forward) | -               |
| Loki         | http://localhost:3101 (port-forward) | -               |

Port-forwards (from WSL):

```bash
kubectl port-forward --address 0.0.0.0 svc/cinem-app -n default 3080:80
kubectl port-forward --address 0.0.0.0 svc/grafana -n monitoring 3001:3000
kubectl port-forward --address 0.0.0.0 svc/prometheus -n monitoring 9091:9090
kubectl port-forward --address 0.0.0.0 svc/loki -n monitoring 3101:3100
```

The "Soul of Lahore - Monitoring" dashboard in Grafana has panels for pods ready,
container restarts, node CPU/memory and application logs from Loki. I built the
panels live in the UI and saved the dashboard as a ConfigMap so it survives.

> Note: prometheus and loki store to emptyDir volumes, so metrics and logs reset
> when the pod is recreated. I know this is not great - real storage is on my
> list, I just have not learned PersistentVolumes properly yet.

## CI/CD

Two GitHub Actions workflows:

- ci.yml - lint, build and smoke test on every pull request and push to main
- docker-push.yml - on push to main, builds the image and pushes it to Docker Hub

To make them run you need these repo secrets (Settings -> Secrets -> Actions):

| Secret                       | Purpose                             |
| ---------------------------- | ----------------------------------- |
| DOCKER_USERNAME              | Docker Hub account                  |
| DOCKER_PASSWORD              | Docker Hub access token (use a PAT) |
| NEXT_PUBLIC_SUPABASE_URL     | Supabase project URL (build arg)    |
| NEXT_PUBLIC_SUPABASE_ANON_KEY| Supabase anon key (build arg)       |

## Known limitations / next steps

Things I know are missing or rough, in no particular order:

- [ ] Persistent storage for prometheus/loki (currently emptyDir, data resets)
- [ ] Alerting rules in Prometheus + notification (I have not tried Alertmanager yet)
- [ ] HTTPS / an ingress - right now it is only reachable on the LAN via port-forward
- [ ] Real test suite (current one is just a smoke test)
- [ ] Maybe move the k8s deployment to a cheap VPS instead of my laptop Minikube
- [ ] Clean up the cinem-app naming to match soul-of-lahore

## Troubleshooting

- Port 3000 already in use - start.ps1 only stops the process serving the app on
  port 3000, so check what else is using the port manually.
- Minikube node restarts (exit 255) - this happens with Docker running nested in
  WSL. Restart with `minikube start --driver=docker --force` and run deploy.sh again.
- App does not come up after deploy - check the pod:
  `kubectl describe pod -l app=cinem-app` and `kubectl logs -l app=cinem-app`.
- No logs in the Grafana Loki panel - check promtail is running and the app pod is
  the one writing to /var/lib/docker/containers:
  `kubectl -n monitoring get pods` and `kubectl -n monitoring logs deploy/promtail`.

More of what I learned is in docs/NOTES.md.