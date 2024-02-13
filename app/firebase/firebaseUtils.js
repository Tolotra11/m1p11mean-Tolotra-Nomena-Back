var admin = require("firebase-admin");

var serviceAccount = require("./key.json");
var db = require("../models");
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY_TOKEN;
var Device = db.device;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});