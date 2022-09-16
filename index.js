const express = require("express");
const cors = require("cors");
const router = express.Router();
const fs = require("fs");
const app = express();
const port = 8080;
const axios = require("axios");

app.use(cors());

app.listen(port, () => {
  console.log("listening on port " + port);
});

let dirApi = "./servicios";
let fileApi = fs.readdirSync(dirApi);
for (let i = 0; i < fileApi.length; i++) {
  let nameService = fileApi[i];
  console.log(nameService);
  runService(`${dirApi}/${nameService}/${nameService}_api.js`, nameService);
}

/**
 * Función para iniciar los servicios de la aplicación
 * @param {string, string} path, nameService
 */
function runService(path, nameService) {
  if (fs.existsSync(path)) {
    console.log(`/api/${nameService}`);
    let api = require(path);
    api(app, `/api/${nameService}`);
  }
}
