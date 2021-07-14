// @ts-check
// This is the file responsible for the file serving.
// This gives us more control in case we want to add more than just file serving.

const express = require("express")
const app = express()
app.use(express.static("public"))
app.use("/js", express.static("js"))
app.use("/ts", express.static("ts"))

app.listen(80, () => {
    console.log("Listening on port 80.")
})