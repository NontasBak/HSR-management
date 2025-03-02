const express = require("express");
const indexRouter = require("./routes/indexRouter");
const pathRouter = require("./routes/pathRouter");

const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));

const PORT = 3000;

app.use("/", indexRouter);
app.use("/paths", pathRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
