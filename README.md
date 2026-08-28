# Soul of Lahore

Soul of Lahore is a website about Lahore - its historic places, food and culture.
The frontend is Next.js. The app is containerized with Docker and deployed on a
local Kubernetes (Minikube) cluster. Prometheus, Grafana and Loki handle metrics
and logging.

[![CI](https://github.com/atiqa-ai/soul-of-lahore/actions/workflows/ci.yml/badge.svg)](https://github.com/atiqa-ai/soul-of-lahore/actions/workflows/ci.yml)

## Tech stack

- Next.js 14 (App Router), TypeScript, Tailwind CSS
- Three.js, GSAP, Lenis - for animations
- Supabase - stores visitor reviews
- Docker - multi-stage image build
- Kubernetes (Minikube) - Deployment, Service, HPA
- Prometheus, Grafana, Loki - monitoring and logs

## Architecture

How it works in simple terms:

1. GitHub Actions builds the project and pushes the Docker image to Docker Hub.
2. The image is loaded into a Minikube cluster.
3. The app runs as a Kubernetes Deployment, exposed through a Service, scaled by an HPA.
4. Reviews read and write to Supabase over HTTPS.
5. Prometheus collects metrics, Loki collects logs, Grafana displays both.

```
GitHub Actions --> Docker Hub --> Minikube (cinem-app)
                                     |
                                     +--> browser (port-forward)
                                     +--> Supabase (reviews)
                                     +--> Prometheus / Grafana / Loki (monitoring)
```

## Getting started

### Prerequisites

- Node.js 18 or newer
- Docker
- Minikube and kubectl (only for the Kubernetes deployment)

### Environment variables

```bash
cp .env.example .env.local
```

Add your Supabase project URL and anon key. `.env.local` is ignored by Git and is
not committed.

### Run on Windows

```powershell
npm install
.\start.ps1
```

The script builds the app, starts it on http://localhost:3000 and prints your LAN
IP so you can test on other devices. On re-run it only restarts its own process.

Without the script:

```bash
npm run dev   # development server
npm run build # production build
npm run start # serve the production build on :3000
```

### Tests

```bash
npm test
```

Builds the app, starts it on port 3011 and checks `/api/health` and the home page.
It is a basic smoke test, not a full test suite.

## Docker

```bash
docker build -f docker/Dockerfile \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=... \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=... \
  -t atikaaa/soul-of-lahore .
docker run --rm -p 3000:3000 atikaaa/soul-of-lahore
```

The Dockerfile has three stages: install dependencies, build the app, and a small
runtime image. The app runs as the `node` user, not root.

## Deploy to Minikube

```bash
wsl -d kali-linux -u root -- bash deploy.sh
```

`deploy.sh` does the following:

1. Reads `.env.local` and passes the `NEXT_PUBLIC_*` values as Docker build args.
2. Builds the image and loads it into Minikube.
3. Applies the manifests in `k8s/` (Deployment, Service, HPA).
4. Waits for the rollout to complete.

Check the result:

```bash
kubectl get deploy,svc,hpa
kubectl port-forward svc/cinem-app 8080:80
curl http://localhost:8080/api/health
```

## Monitoring

The `monitoring` namespace runs Prometheus, Grafana, Loki and promtail.

| Service    | URL                                  | Credentials |
| ---------- | ------------------------------------ | ----------- |
| Grafana    | http://localhost:3001 (port-forward) | admin/admin |
| Prometheus | http://localhost:9091 (port-forward) | -           |
| Loki       | http://localhost:3101 (port-forward) | -           |

The Grafana dashboard shows pod status, container restarts, node CPU and memory,
and application logs. Prometheus scrapes the app, kube-state-metrics,
node-exporter and the kubelet.

Note: Prometheus and Loki write to `emptyDir` volumes, so metrics and logs reset
when the pod restarts. Persistent storage is not configured yet.

## CI/CD

Two workflows in `.github/workflows`:

- `ci.yml` - lint, build and test, on every push and pull request to `main`.
- `docker-push.yml` - on push to `main`, builds the image and pushes it to Docker
  Hub (tags `latest` and the commit SHA).

Repository secrets needed (Settings -> Secrets -> Actions):

| Secret                       | Purpose                            |
| ---------------------------- | ---------------------------------- |
| `DOCKER_USERNAME`            | Docker Hub account                 |
| `DOCKER_PASSWORD`            | Docker Hub access token (a PAT)    |
| `NEXT_PUBLIC_SUPABASE_URL`   | Supabase project URL (build arg)   |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key (build arg)   |

## Known limitations

- No persistent storage for Prometheus and Loki (data resets on pod restart).
- No alerting rules or Alertmanager yet.
- No HTTPS or ingress; the app is reachable on the LAN through a port-forward.
- The test suite is only a smoke test.
- The application runs on a local Minikube instance, not a hosted cloud cluster.

## Troubleshooting

- Port 3000 in use - `start.ps1` only stops the process serving port 3000; other
  processes holding the port must be stopped manually.
- Minikube node crashes (exit 255) - happens when Docker runs nested inside WSL.
  Restart with `minikube start --driver=docker --force` and run `deploy.sh` again.
- App not reaching ready - check the pod and logs:
  `kubectl describe pod -l app=cinem-app` and `kubectl logs -l app=cinem-app`.
- No logs in Grafana - confirm promtail is running and can read the container
  logs: `kubectl -n monitoring get pods`, `kubectl -n monitoring logs deploy/promtail`.

More notes about deployment lessons are in `docs/NOTES.md`.