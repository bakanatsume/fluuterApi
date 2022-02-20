
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

require("./database/database");

const userRoute = require("./router/userRoute");
app.use(userRoute);

const adminRoute = require("./router/adminRoute");
app.use(adminRoute);

const postRoute = require("./router/postRoute");
app.use(postRoute);

const commentRoute = require("./router/commentRoute");
app.use(commentRoute);

const likeRoute = require("./router/likeRoute");
app.use(likeRoute);

const followRoute = require("./router/followRoute");
app.use(followRoute);

const reportRoute = require("./router/reportRoute");
app.use(reportRoute);

app.use(express.static(__dirname+'/image/'));

app.listen(1001);