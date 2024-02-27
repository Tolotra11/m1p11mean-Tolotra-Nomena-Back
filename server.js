const express = require("express");
const cors = require("cors");
const app = express();
const cron = require('node-cron');
const reminder = require('./app/service/rappel.service');
require('dotenv').config();

var corsOptions = {
    origin: "http://localhost:4200"
  };
  
  app.use(cors(corsOptions));
  
  // parse requests of content-type - application/json
  app.use(express.json());
  
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));

  //connect to database
  
    const db = require("./app/models");
    db.mongoose
    .connect(db.url)
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });
  //Rappel tout les jours à 6 heure du matin
  cron.schedule('0 6 * * *', () => {
      console.log('reminder');
      reminder.sendReminder();
  });
  
  
  require("./app/routes/authentification.routes")(app);
  require("./app/routes/offreSpecial.routes")(app);
  require("./app/routes/device.routes")(app);
  require("./app/routes/manager.routes")(app);
  require("./app/routes/user.routes")(app);
  require("./app/routes/service.routes")(app);
  require("./app/routes/client.routes")(app);
  require("./app/routes/employe.routes")(app);
  // set port, listen for requests
  const PORT = process.env.PORT || 1675;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });