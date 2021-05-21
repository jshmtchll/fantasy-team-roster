const express = require("express");
const routes = require('./controllers/');
const sequelize = require("./config/connection");
const exphbs = require("express-handlebars");
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
const session = require("express-session");
const path = require('path');
require('dotenv').config();

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: process.env.Secret,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

//app.use(session(sess));

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);


app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});