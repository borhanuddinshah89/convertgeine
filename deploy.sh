#!/usr/bin/env bash

set -e

echo
echo "ConvertGeine Frontend Deploy"
echo "============================"

echo
echo "1. Checking Git status..."
git status --short

if git diff --quiet && git diff --cached --quiet; then
  echo
  echo "No frontend changes to deploy."
  exit 0
fi

echo
echo "2. Running production build..."
npm run build

echo
read -r -p "Commit message: " COMMIT_MESSAGE

if [ -z "$COMMIT_MESSAGE" ]; then
  echo "Commit message cannot be empty."
  exit 1
fi

echo
echo "3. Staging changes..."
git add .

echo
echo "4. Committing..."
git commit -m "$COMMIT_MESSAGE"

echo
echo "5. Pushing to GitHub..."
git push origin main

echo
echo "Push completed."
echo "Vercel should deploy the new commit automatically."

if [ -x "./check-convertgeine.sh" ]; then
  echo
  echo "Waiting 45 seconds before checking the live site..."
  sleep 45

  echo
  echo "6. Running ConvertGeine health check..."
  ./check-convertgeine.sh
else
  echo
  echo "Health checker was not found or is not executable."
fi
