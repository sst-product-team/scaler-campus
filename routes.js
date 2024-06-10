'use strict'
const jwt = require('jsonwebtoken');

module.exports = function (app, opts) {

  app.get('', (req, res) => {
    res.send(JSON.stringify({
      "status": "server is running"
    }));
  })

  app.get('/attendance-token', (req, res) => {

    const clientToken = jwt.sign(
      {
        "purpose": "attendance",
      },
      process.env.JWT_SIGNING_KEY,
      {
        expiresIn: "20s"
      }
    )

    res.send(JSON.stringify({
      "status": "success",
      "client-token": clientToken
    }));
  });

  app.get('/req-token', (req, res) => {

    const clientToken = jwt.sign(
      {
        "validity": true,
      },
      process.env.JWT_SIGNING_KEY
    )

    res.send(JSON.stringify({
      "status": "Running",
      "client-token": clientToken
    }));
  });

  app.get('/verify-token', (req, res) => {
    const token = req.headers['client'];
    try {
      const key = jwt.verify(
        token,
        process.env.JWT_SIGNING_KEY
      );
      if(key.validity) res.sendStatus(200);
      else res.sendStatus(401);
    } catch (e) {
      res.sendStatus(401);
    }
  });
}