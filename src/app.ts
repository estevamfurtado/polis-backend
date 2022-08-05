import cors from "cors";
import express from "express";
import "express-async-errors";

import mw from "./middlewares/index.js"
import router from "./routers/index.js";
import testRouter from "./routers/index.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", router);

if (process.env.NODE_ENV === "test") {
    console.log('test env')
	app.use('/tests', testRouter);
}

app.use(mw.error.errorHandler);

export default app;
