const express = require("express");
const indexRouter = require("./routes/indexRouter");
const pathRouter = require("./routes/pathRouter");
const characterRouter = require("./routes/characterRouter");

const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");

const PORT = 3000;
app.use(express.static("public"));

app.use("/", indexRouter);
app.use("/paths", pathRouter);
app.use("/characters", characterRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
