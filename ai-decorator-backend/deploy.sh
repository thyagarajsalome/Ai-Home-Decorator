#!/bin/bash

# --- Configuration ---
PROJECT_ID="gen-lang-client-0713409159" # <-- REPLACE with your Google Cloud Project ID
SERVICE_NAME="ai-decorator-backend"
REGION="asia-south1"
IMAGE_TAG="gcr.io/gen-lang-client-0713409159/ai-decorator-backend"
# If using Artifact Registry, use:
# IMAGE_TAG="asia-south1-docker.pkg.dev/$PROJECT_ID/YOUR_REPO_NAME/$SERVICE_NAME"

# --- Script Start ---
echo "Starting deployment for ai-decorator-backend..."

# 1. Build the Docker image using Cloud Build and tag it
echo "Building Docker image: asia-south1-docker.pkg.dev"
gcloud builds submit --tag asia-south1-docker.pkg.dev .

# Check if build was successful
if [ $? -ne 0 ]; then
  echo "Error: Docker image build failed."
  exit 1
fi

# 2. Deploy the new image to Cloud Run
echo "Deploying image to Cloud Run service: ai-decorator-backend in region $REGION"
gcloud run deploy ai-decorator-backend \
  --image asia-south1-docker.pkg.dev \
  --region "asia-south1" \
  --platform managed \
  --allow-unauthenticated \
  --quiet # Add --quiet to reduce interactive prompts

# Check if deploy was successful
if [ $? -ne 0 ]; then
  echo "Error: Cloud Run deployment failed."
  exit 1
fi

echo "Deployment successful!"
exit 0