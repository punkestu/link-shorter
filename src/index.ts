import {config} from "dotenv";
config();

import express from "./bin/express";
if (process.env.APP_EXPRESS == "1") {
    express.listen(process.env.PORT || 3000);
}
