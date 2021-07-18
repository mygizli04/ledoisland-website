// This is the file responsible for the file serving.
// This gives us more control in case we want to add more than just file serving.

const express = require("express")
const app = express()
app.use(express.static("public"))

const uglify = require("uglify-js")
const fs = require("fs")

if (!fs.existsSync("./minified/")) {
    fs.mkdirSync("./minified/")
}
fs.readdirSync("./js").forEach(file => {
    if (file.endsWith(".map")) return

    if (file.endsWith(".js")) {
        let minified = uglify.minify(fs.readFileSync("./js/" + file).toString(), {
            sourceMap: {
                content: JSON.parse(fs.readFileSync("./js/" + file + ".map").toString()),
                url: file +  ".map"
            }
        })
        fs.writeFileSync("./minified/" + file, minified.code)
        fs.writeFileSync("./minified/" + file + ".map", minified.map)
    }
})

app.use("/js", express.static("js"))
app.use("/minified", express.static("minified"))
app.use("/ts", express.static("ts"))

const minecraft = require("minecraft-protocol");
app.get("/server", (req, res) => {
    let responded = false
    setTimeout(() => {
        if (!responded) {
            debugger
            res.status(500)
            res.send(JSON.stringify({
                error: true,
                errorMessage: "Response timed out."
            }))
            responded = true
        }
    }, 60000)
    minecraft.ping({
        host: "ledoisland.mc-srv.com"
    }, (err, result) => {
        if (responded) {return} else responded = true
        if (err) {
            res.status(503)
            res.send(JSON.stringify({
                error: true,
                errorMessage: err.message
            }))
        }
        else {
            result.error = false
            res.send(JSON.stringify(result))
        }
    })
})

app.listen(80, () => {
    console.log("Listening on port 80.")
})
