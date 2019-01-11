var express = require('express')
var app = express()
var appPort = process.env.PORT || 3000
var cors = require('cors')

//Enable Cors
app.use(cors())

//Serve all static files
app.use(express.static("assets"))

// Serve Index.html
app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/index.html")
})

//create current date
app.get("/api/timestamp", (req, res) => {
    var currentDate = new Date()
    var context = {
        unix: currentDate.getTime(),
        utc: currentDate.toUTCString()
    }
    res.status(200).json(context)
})

//Show Date
app.get("/api/timestamp/:date_string", (req, res) => {
    var validDate, context;

    if (!isNaN(req.params.date_string)) {
        validDate = new Date(parseInt(req.params.date_string))
    } else {
        validDate = new Date(req.params.date_string)
    }

    if (!isNaN(validDate.getTime())) {
        context.unix = validDate.getTime()
        context.utc = validDate.toUTCString()
    } else {
        context.error = "Invalid Date"
    }

    res.status(200).json(context)
})


var listenCallback = () => console.log(`Listening on ${appPort}`)

//start listening on port
app.listen(appPort, listenCallback)