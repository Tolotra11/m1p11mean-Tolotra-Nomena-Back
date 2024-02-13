const express = require("express");
const cors = require("cors");
const app = express();

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
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });
  
  require("./app/routes/offreSpecial.routes")(app);
  require("./app/routes/device.routes")(app);
  // set port, listen for requests
  const PORT = process.env.PORT || 1672;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });