const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const app = require("./app");
const connect = require("./configs/config");
const port = process.env.PORT;
connect();
app.listen(port, () => console.log(`Server runnig is ${port}`));
