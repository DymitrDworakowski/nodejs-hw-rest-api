require("dotenv").config();

require("./db/db");

const app = require("./app");

const PORT = process.env.PORT || 8000;

app.listen({ port: PORT }, () => {
  console.log(`Server started on port ${PORT}`);
});
