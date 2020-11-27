const API_ROOT = process.env.REACT_APP_API_ROOT || ""
const DEFAULT_AUTH_TOKEN = process.env.REACT_APP_DEFAULT_AUTH_TOKEN || "no_auth_token"
const SECRET_MSG = process.env.REACT_APP_SECRET_MSG || "nope_no_msg"

const config = {
    API_ROOT, 
    DEFAULT_AUTH_TOKEN, 
    SECRET_MSG
}
export default config