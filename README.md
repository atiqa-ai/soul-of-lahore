# Soul of Lahore

Soul of Lahore is a cultural website that presents the city of Lahore through its
historic monuments, food and everyday stories. The application is built with
Next.js and includes a cinematic frontend, a visitor reviews system powered by
Supabase, and a REST API with health and review endpoints.

The project follows a standard containerized deployment flow: the code is built
and pushed to Docker Hub by GitHub Actions, then deployed to a local Kubernetes
cluster (Minikube). A Prometheus, Grafana and Loki stack provides metrics,
dashboards and centralized logging for the cluster and the application.

[![CI](https://github.com/atiqa-ai/soul-of-lahore/actions/workflows/ci.yml/badge.svg)](https://github.com/atiqa-ai/soul-of-lahore/actions/workflows/ci.yml)
[![Deploy](https://github.com/atiqa-ai/soul-of-lahore/actions/workflows/docker-push.yml/badge.svg)](https://github.com/atiqa-ai/soul-of-lahore/actions/workflows/docker-push.yml)

## Tech stack

| Layer            | Technology                                    |
| ---------------- | --------------------------------------------- |
| Frontend         | Next.js 14 (App Router), TypeScript, Tailwind |
| Animations       | Three.js, GSAP, Lenis                         |
| Data             | Supabase (Postgres) - visitor reviews         |
| Container        | Docker - multi-stage image build              |
| Orchestration    | Kubernetes on Minikube - Deployment, Service, HPA |
| CI/CD            | GitHub Actions                                |
| Observability    | Prometheus, Grafana, Loki, promtail           |

## Architecture

```
                     +----------------------------+
                     |   GitHub Actions           |
                     |   ci.yml + docker-push.yml |
                     +-------------+--------------+
                                   |
                                   |  docker build & push
                                   v
                     +----------------------------+
                     |   Docker Hub               |
                     |   atikaaa/soul-of-lahore   |
                     +-------------+--------------+
                                   |
                                   |  image load / pull
                                   v
                     +----------------------------+
                     |   Minikube cluster         |
                     |                            |
                     |  cinem-app (Deployment)    |
                     |    + Service  (port 80)    |
                     |    + HPA      (1-4)        |
                     |                            |
                     |  monitoring namespace:     |
                     |    prometheus              |
                     |    grafana                 |
                     |    loki + promtail         |
                     +-------------+--------------+
                                   |
              +--------------------+--------------------+
              v                    v                    v
        Browser            Supabase (cloud)    Prometheus / Grafana / Loki
        localhost:3000     reviews + anon key   metrics + logs
```

The architecture is split into four parts:

1. **CI/CD layer** - GitHub Actions validates every change (lint, build, smoke
   test) and publishes the Docker image on pushes to `main`.
2. **Container registry** - Docker Hub stores image versions tagged by `latest`
   and by commit SHA.
3. **Orchestration layer** - a Deployment runs the app, a Service exposes it on
   port 80, and an HPA scales between 1 and 4 replicas based on CPU.
4. **Observability layer** - Prometheus scrapes metrics, promtail ships container
   logs to Loki, and Grafana renders dashboards for the app and cluster.

## Workflow

The release flow works end to end like this:

1. A developer pushes code to the `main` branch.
2. `ci.yml` runs lint, a production build and a smoke test.
3. `docker-push.yml` builds the image and publishes it to Docker Hub under
   `:latest` and `:<commit-sha>`.
4. On the local machine, `deploy.sh` (or `kubectl apply`) loads that image into
   Minikube and rolls out the Deployment.
5. The app starts serving on port 3000. Requests for place pages, reviews and the
   health check are handled by the Next.js server; reviews read and write Supabase.
6. Prometheus scrapes the app and cluster metrics, promtail forwards container
   logs to Loki, and Grafana displays the results in real time.

## Local execution

The steps below cover the full local setup: environment, application, Docker,
Kubernetes and monitoring.

### 0. Prerequisites

- Node.js 18 or newer
- Docker (run inside WSL on Windows)
- Minikube and kubectl

### 1. Environment variables

```bash
cp .env.example .env.local
```

Fill in the Supabase project URL and anon key. `.env.local` is ignored by Git and
is never committed.

### 2. Run the application

```bash
npm install
npm run dev        # development server on http://localhost:3000
```

Production build and run:

```bash
npm run build
npm run start
```

Windows shortcut:

```powershell
.\start.ps1
```

It builds the app, starts it on port 3000 and prints the LAN IP for testing on
other devices.

Run the smoke test:

```bash
npm test
```

### 3. Build the Docker image

The image needs the two `NEXT_PUBLIC_*` values as build args because they are
baked into the client bundle at build time.

```bash
export NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
export NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

docker build -f docker/Dockerfile \
  --build-arg NEXT_PUBLIC_SUPABASE_URL="$NEXT_PUBLIC_SUPABASE_URL" \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY="$NEXT_PUBLIC_SUPABASE_ANON_KEY" \
  -t atikaaa/soul-of-lahore:latest .
```

### 4. Run the container

```bash
docker run --rm -p 3000:3000 -d atikaaa/soul-of-lahore:latest
curl http://localhost:3000/api/health
docker logs -f $(docker ps -q -f ancestor=atikaaa/soul-of-lahore:latest)
```

To tag and push to Docker Hub:

```bash
docker login -u atikaaa
docker push atikaaa/soul-of-lahore:latest
```

### 5. Deploy to Kubernetes (Minikube)

```bash
minikube start --driver=docker --force
kubectl get nodes
```

Deploy the application:

```bash
kubectl apply -f k8s/
kubectl rollout status deployment/cinem-app --timeout=180s
kubectl get deploy,svc,hpa,pods
```

Expose the app on the host:

```bash
kubectl port-forward svc/cinem-app 3080:80
curl http://localhost:3080/api/health
```

One-command alternative - `deploy.sh` builds, loads the image into Minikube,
applies the manifests and waits for the rollout:

```bash
wsl -d kali-linux -u root -- bash deploy.sh
```

### 6. Enable monitoring

Apply the monitoring stack (Prometheus, Grafana, Loki, promtail):

```bash
kubectl apply -f k8s/monitoring/
kubectl -n monitoring get pods
```

Open port-forwards for the monitoring services:

```bash
kubectl port-forward --address 0.0.0.0 svc/grafana -n monitoring 3001:3000
kubectl port-forward --address 0.0.0.0 svc/prometheus -n monitoring 9091:9090
kubectl port-forward --address 0.0.0.0 svc/loki -n monitoring 3101:3100
```

Then:

1. Open http://localhost:3001 and log in with `admin` / `admin`.
2. Open the "Soul of Lahore - Monitoring" dashboard - it shows pod status,
   restarts, node CPU and memory, and application logs from Loki.
3. Check Prometheus targets at http://localhost:9091/targets (all should be UP).
4. Inspect raw logs in Loki at http://localhost:3101/ready.

### 7. CI/CD automation

Two workflows in `.github/workflows`:

- `ci.yml` - lint, build and smoke test on every push and pull request to `main`.
- `docker-push.yml` - build and push the image to Docker Hub on push to `main`.

Repository secrets (Settings -> Secrets -> Actions):

| Secret                        | Purpose                            |
| ----------------------------- | ---------------------------------- |
| `DOCKER_USERNAME`             | Docker Hub account                 |
| `DOCKER_PASSWORD`             | Docker Hub access token (a PAT)    |
| `NEXT_PUBLIC_SUPABASE_URL`    | Supabase project URL (build arg)   |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key (build arg)    |

## Endpoint reference

| URL                    | Description                  |
| ---------------------- | ---------------------------- |
| http://localhost:3000  | application (direct)         |
| http://localhost:3080  | application (k8s port-forward) |
| http://localhost:3001  | Grafana (admin/admin)        |
| http://localhost:9091  | Prometheus                   |
| http://localhost:3101  | Loki                         |
| /api/health            | health check (JSON)          |
| /api/reviews           | visitor reviews (JSON)       |

## Known limitations

- No persistent storage for Prometheus and Loki; metrics and logs reset when the
  pod restarts (`emptyDir`).
- No alerting rules or Alertmanager yet.
- No HTTPS or ingress; access is via port-forward on the LAN.
- The test suite is a smoke test only.
- The cluster runs on local Minikube, not a hosted cloud provider.

## Troubleshooting

- Port 3000 already in use - `start.ps1` only stops the process serving port
  3000; release the port manually for other processes.
- Minikube node crashes with exit 255 - a known issue when Docker runs nested in
  WSL. Restart with `minikube start --driver=docker --force` and re-run
  `deploy.sh`.
- Pod not ready after deploy - inspect it: `kubectl describe pod -l app=cinem-app`
  and `kubectl logs -l app=cinem-app`.
- No application logs in Grafana - check that promtail is running and can read the
  docker container logs: `kubectl -n monitoring get pods`,
  `kubectl -n monitoring logs deploy/promtail`.

Additional deployment lessons are recorded in `docs/NOTES.md`.