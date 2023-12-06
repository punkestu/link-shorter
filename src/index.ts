import express from "./bin/express";

if (process.env.APP_EXPRESS) {
    express.listen(process.env.PORT || 3000);
}
