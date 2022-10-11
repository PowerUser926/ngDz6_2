const express = require("express");
const app = express();
const jsonParser = express.json();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PATCH, PUT, POST, DELETE, OPTIONS"
  );
  next();
});

app.post("/postuser", jsonParser, function (request, response) {
  if (!request.body) return response.sendStatus(400);

  let login = request.body.login;
  let password = request.body.password;
  let user = { Login: login, Password: password };

  const fs = require("fs");
  fs.readFile("user.json", "utf-8", function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      let arr = [];
      try {
        arr = JSON.parse(data);
      } catch (error) {
        console.log(error);
        arr = [];
      }

      if (arr.length === 0) {
        arr.push(user);
        json = JSON.stringify(arr);
        fs.writeFileSync("user.json", json);
        response.json("Registered");
      } else {
        arr.forEach((u) => {
          if (u.Login !== user.Login || u.Password !== user.Password) {
            arr.push(user);
            json = JSON.stringify(arr);
            fs.writeFileSync("user.json", json);
            response.json("Registered");
          } else {
            response.json("This user is already registered");
          }
        });
      }
    }
  });
});

app.listen(3000);
