#!/bin/bash
# CI-push -> local apply CD helper.
#
# The image is built and pushed to Docker Hub by GitHub Actions (docker-push.yml).
# A GitHub runner cannot reach the local minikube, so the deploy step runs here.
#
# Usage (inside the Kali WSL distro, from the repo root):
#   bash deploy_local.sh            # deploy the image for the current HEAD commit
#   bash deploy_local.sh <sha>      # deploy a specific image sha/tag
#   bash deploy_local.sh rollback   # undo the last rollout
set -euo pipefail

REPO="${DOCKER_IMAGE:-atikaaa/soul-of-lahore}"
DEPLOY="cinem-app"

usage() {
  echo "usage: $0 [rollback|<sha>]    (default: image tagged with current HEAD sha)" >&2
  exit 1
}

if [ "${1:-}" = "-h" ] || [ "${1:-}" = "--help" ]; then usage; fi

if [ "${1:-}" = "rollback" ]; then
  kubectl rollout undo "deployment/$DEPLOY"
  kubectl rollout status "deployment/$DEPLOY" --timeout=240s
  echo "ROLLBACK_OK"
  exit 0
fi

TAG="${1:-$(git rev-parse HEAD)}"
IMAGE="$REPO:$TAG"
echo "==> image: $IMAGE"

minikube image pull "$IMAGE" 2>/dev/null || true

kubectl set image "deployment/$DEPLOY" "$DEPLOY=$IMAGE"
kubectl rollout status "deployment/$DEPLOY" --timeout=240s

echo "==> verification"
kubectl get pods -l app=cinem-app
sleep 3
for u in /api/health / /places /reviews /place/minar-pakistan; do
  code=$(curl -s -o /dev/null -w '%{http_code}' -m 10 "http://localhost:3080$u")
  echo "  $u -> $code"
  [ "$code" = "200" ] || { echo "VERIFY_FAIL $u=$code"; exit 1; }
done
echo "DEPLOY_OK image=$IMAGE"