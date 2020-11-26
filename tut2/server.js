const express = require('express')
const dotenv = require('dotenv')


/** ENV VARS */
dotenv.config()
const BE_PORT = process.env.BE_PORT || "2611"
const BE_HOST = process.env.BE_HOST || "127.0.0.1"
const SECRET_MSG = process.env.SECRET_MSG || "nope_no_msg"

/** ROUTING */

const testRoutes = express.Router()
testRoutes.get("/echo", (request, response) => {
    return response.status(200).json({error: false, message: "Everything Looks fine"})
})
testRoutes.post("/api/parrot", (request, response) => {
    return response.status(200).json({error: false, "🦜":{...request.body}})
})
testRoutes.get(`/api/secret/`, (request, response) => {
    return response.status(200).json({error:false, message: SECRET_MSG})
})


/** SERVER DEF */
function startServer(host, port, routes = []) {
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use("/", routes)
    app.listen(port, host, () => {
        console.log(`L'OMEGABackend ti ascolta su http://${host}:${port}`)
    })
}

/** START */
startServer(BE_HOST, BE_PORT, [testRoutes])