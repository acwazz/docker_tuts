const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')


/** ENV VARS */
dotenv.config()
const BE_PORT = process.env.BE_PORT || "2611"
const BE_HOST = process.env.BE_HOST || "127.0.0.1"
const SECRET_MSG = process.env.SECRET_MSG || "nope_no_msg"
const DEFAULT_AUTH_TOKEN = process.env.DEFAULT_AUTH_TOKEN || "no_auth_token"


/** ROUTING */
const testRoutes = express.Router()
/**
 * Ritorna una risposta di healthcheck
 */
testRoutes.get("/api/echo", (request, response) => {
    return response.status(200).json({error: false, message: "Everything Looks fine!"})
})
/**
 * Ritorna il payload in body della POST
 */
testRoutes.post("/api/parrot", (request, response) => {
    return response.status(200).json({error: false, message: "Ciao sono un Pappagallo 🦜", data:{...request.body}})
})
/**
 * Ritorna la variabile d'ambiente SECRET_MSG
 */
testRoutes.get(`/api/secret/`, (request, response) => {
    return response.status(200).json({error:false, message: "Hey Indiana!", data: {secret: SECRET_MSG}})
})


/** MIDDLEWARE */
/**
 * Controlla l'autenticazione delle chiamate
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {Function} next 
 */
function checkAuth(req, res, next) {
    const isAuthenticated = req.header('Authorization') == `Basic ${DEFAULT_AUTH_TOKEN}`
    const isUnsetToken = DEFAULT_AUTH_TOKEN == "no_auth_token"
    if (isUnsetToken || !isAuthenticated ) {
        return res.status(403).json({error: true, message:"Wrong credentials!"})
    }
    next()
}


/** SERVER DEF */
/**
 * Inizializza un server di Express
 * @param {String} host 
 * @param {String} port 
 * @param {Array} routes 
 */
function startServer(host, port, routes = []) {
    const app = express()
    app.use(morgan('dev'))
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(checkAuth)
    app.use(routes)
    app.listen(port, host, () => {
        console.log(`L'OMEGABackend ti ascolta su http://${host}:${port}`)
    })
}


/** START */
startServer(BE_HOST, BE_PORT, [testRoutes])