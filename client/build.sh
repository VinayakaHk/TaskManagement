rm -rf dist

npm run build

fly deploy

echo "Deployed to Fly.io"