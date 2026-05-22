const app = require("./src/app");
const { connectDB } = require("./src/config/db");

const port = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`HireInfinity API listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start API", error);
    process.exit(1);
  });
