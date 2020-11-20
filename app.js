'use strict';
const express = require('express');
const cors = require('cors');
const fs      = require('fs');
const https = require('https');
const bodyParser = require('body-parser');
const catRoute = require('./routes/catRoute');
const userRoute = require('./routes/userRoute');
const passport = require('./utils/pass.js');
const authRoute = require('./routes/authRoute');
const app = express();

app.enable('trust proxy');

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    console.log(`https://${req.headers.host}${proxypath}${req.url}`);
    if (req.secure) {
      // request was via https, so do no special handling
      console.log('running secure!');
      next();
    } else {
      console.log('running insecure!');
      // if express app run under proxy with sub path URL
      // e.g. http://www.myserver.com/app/
      // then, in your .env, set PROXY_PASS=/app
      // Adapt to your proxy settings!
      const proxypath = process.env.PROXY_PASS || '';
      // request was via http, so redirect to https
      console.log(`https://${req.headers.host}${proxypath}${req.url}`);
      res.redirect(301, `https://${req.headers.host}${proxypath}${req.url}`);
    }
  });
}

const sslkey  = fs.readFileSync('/etc/pki/tls/private/ca.key');
const sslcert = fs.readFileSync('/etc/pki/tls/certs/ca.crt');
const options = {
  key: sslkey,
  cert: sslcert
};


app.use(express.static('uploads'));
app.use(express.static('public'));
app.use('/thumbnails', express.static('thumbnails'));

app.use('/auth', authRoute);
app.use('/cat', passport.authenticate('jwt', {session: false}), catRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);

app.listen(3000); //normal http traffic
https.createServer(options, app).listen(8000); //https traffic
