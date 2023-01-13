echo "Switching to production branch"
git checkout production
echo "Building app..."
npm run build
echo "Deploying to server!!!"
scp -r build/* student@193.191.169.25:/var/www/193.191.169.25/

echo "Done!"