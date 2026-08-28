#!/bin/bash
# Manual local deploy: pulls image from Docker Hub and deploys to local Minikube.
# Run inside the Kali WSL distro as root:
#   wsl -d kali-linux -u root -- bash deploy.sh <DOCKER_USERNAME> [IMAGE_TAG]
set -euo pipefail

DOCKER_USERNAME="${1:?usage: deploy.sh <DOCKER_USERNAME> [IMAGE_TAG]}"
IMAGE_TAG="${2:-latest}"
IMAGE="$DOCKER_USERNAME/soul-of-lahore:$IMAGE_TAG"
NAMESPACE="default"

echo "==> Pulling image: $IMAGE"
docker pull "$IMAGE"

echo "==> Tagging as local cinem_app:latest"
docker tag "$IMAGE" cinem_app:latest

echo "==> Loading image into minikube"
minikube image load cinem_app:latest

echo "==> Applying Kubernetes manifests"
kubectl apply -f k8s/

echo "==> Waiting for rollout to complete"
kubectl rollout status deployment/cinem-app --timeout=180s

echo "==> Deployment summary"
kubectl get deploy,svc,hpa cinem-app

echo "==> Done. Verify site:"
echo "    kubectl port-forward svc/cinem-app 8080:80"
echo "    curl http://localhost:8080/api/health"
