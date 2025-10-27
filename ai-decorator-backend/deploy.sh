#!/bin/bash

# --- Configuration ---
PROJECT_ID="gen-lang-client-0713409159"
SERVICE_NAME="ai-decorator-backend"
REGION="asia-south1"
# Use the GCR format tag
IMAGE_TAG="gcr.io/$PROJECT_ID/$SERVICE_NAME"
# Note: If using Artifact Registry instead, the format would be like:
# IMAGE_TAG="asia-south1-docker.pkg.dev/$PROJECT_ID/YOUR_REPO_NAME/$SERVICE_NAME"

# --- Script Start ---
echo "Starting deployment for $SERVICE_NAME..."

# 1. Build the Docker image using Cloud Build and tag it with the correct IMAGE_TAG
echo "Building Docker image: $IMAGE_TAG"
gcloud builds submit --tag "$IMAGE_TAG" .

# Check if build was successful
if [ $? -ne 0 ]; then
  echo "Error: Docker image build failed."
  exit 1
fi

# 2. Deploy the new image to Cloud Run using the correct IMAGE_TAG
echo "Deploying image to Cloud Run service: $SERVICE_NAME in region $REGION"
gcloud run deploy "$SERVICE_NAME" \
  --image "$IMAGE_TAG" \
  --region "$REGION" \
  --platform managed \
  --allow-unauthenticated \
  --quiet

# Check if deploy was successful
if [ $? -ne 0 ]; then
  echo "Error: Cloud Run deployment failed."
  exit 1
fi

echo "Deployment successful!"
exit 0