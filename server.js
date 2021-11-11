const express = require('express');
const app = express();

app.use(express.json());

const sequelize = require('./db/sqlConnection');

const appRoute = require('./routes/app');
const authRoute = require('./routes/auth');

app.use('/app', appRoute);
app.use('/auth', authRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log("Server Port: " + PORT);
  await sequelize.sync(); // setup db connection
});