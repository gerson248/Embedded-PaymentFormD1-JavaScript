const express = require("express");
const path = require("path");
const morgan = require("morgan");
const app = express();

//Importando rutas // importing routes
const routes = require("./routes");

//configuración //settings
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//middlewares
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: false }));
//rutas //routes
app.use("/", routes);

//Static files // Archivos estaticos
app.use(express.static(path.join(__dirname, "public")));

//Starting the server // Empezando el servidor
app.listen(app.get("port"), () => {
  console.log("Server on port 3000");
});
