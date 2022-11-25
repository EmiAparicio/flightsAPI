const server = require("./src/app");
const db = require("./src/db");

const PORT = process.env.PORT !== undefined ? process.env.PORT : 3000;

db.sequelize.sync({ force: true }).then(async () => {
  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
