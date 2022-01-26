const app = require("./src/app");

const port = process.env.PORT || 6004;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
