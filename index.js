const app = require("./server");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { appRouter } = require("./routers/app-router");

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", appRouter);
