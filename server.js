const express = require('express')
const app = express()
const data = require("./data")
app.use(express.urlencoded({ extended: true }));
app.use(express.static('resources'))
app.set("views", "html")
app.set("view engine", "pug")