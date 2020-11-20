# wop-starters

Choose a branch and download as zip.

### How to run
1. npm i
1. create .env
   ```dotenv
   DB_HOST=
   DB_USER=
   DB_PASS=
   DB_NAME=
   PROXY_PASS=/app
   ```
1. Locally run `NODE_ENV=development nodemon app.js`
1. On the server run 
   * `NODE_ENV=production nodemon app.js`
   * or `pm2 start app.js --env production`

