#!/bin/bash
# Local deploy script I run every time I want to update the app on minikube.
# Builds the image, loads it into minikube and re-applies the k8s manifests.
#
# Run it inside the Kali WSL distro as root:
#   wsl -d kali-linux -u root -- bash deploy.sh [IMAGE_NAME] [IMAGE_TAG]
set -euo pipefail

IMAGE_NAME="${1:-atikaaa/soul-of-lahore}"
IMAGE_TAG="${2:-latest}"
IMAGE="$IMAGE_NAME:$IMAGE_TAG"

cd "$(dirname "$0")"

if [ ! -f .env.local ]; then
  echo "!! .env.local not found - copy .env.example to .env.local first" >&2
  exit 1
fi

# Export the NEXT_PUBLIC_* values so they become Docker build args.
# (Learned this the hard way - without them the app builds but shows no data.)
set -a
source .env.local
set +a

# make sure minikube is actually up before we start (WSL restarts kill it)
echo "==> Checking minikube..."
if ! minikube status >/dev/null 2>&1; then
  echo "!! minikube is not running, start it first: minikube start" >&2
  exit 1
fi

echo "==> Building image: $IMAGE"
docker build --pull \
  --build-arg NEXT_PUBLIC_SUPABASE_URL="$NEXT_PUBLIC_SUPABASE_URL" \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY="$NEXT_PUBLIC_SUPABASE_ANON_KEY" \
  -f docker/Dockerfile -t "$IMAGE" .

echo "==> Loading image into minikube"
minikube image load "$IMAGE"

echo "==> Applying Kubernetes manifests"
kubectl apply -f k8s/

echo "==> Waiting for rollout to complete"
kubectl rollout status deployment/cinem-app --timeout=180s

echo "==> Deployment summary"
kubectl get deploy,svc,hpa cinem-app

echo "==> Done. Port-forward to verify:"
echo "    kubectl port-forward svc/cinem-app 8080:80"
echo "    curl http://localhost:8080/api/health"

# TODO: rename cinem-app to soul-of-lahore to match the repo, and set
# imagePullPolicy: Always once the CI workflow starts pushing to Docker Hub.