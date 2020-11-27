import React from "react"
import HttpClient from "./Client"
import bgImage from './static/background.webp';
import './App.css';
import dotenv from "dotenv"



dotenv.config()
const client = new HttpClient()


function App() {
    const [toastHidden, setToastHidden] = React.useState(true)
    const [toastText, setToastText] = React.useState("")
    const [parrotRequest, setParrotRequest] = React.useState("")
    
    const handleToastClose = evt => { 
        evt.target.parentElement.animate([{ top: "20px", display:"block" }, { top: "-1000px", display: "none"} ], 500)
        setTimeout(() => setToastHidden(true), 450)
    }
    const submitParrot = evt => {
        client.parrot(parrotRequest).catch(err => {
            setToastText(err.message)
            setToastHidden(false)
        }).then(res => {
            setToastText(res)
            setToastHidden(false)
        })
    }

    React.useEffect(() => {
        client.echo().then(res => console.log("Connection OK")).catch(err => {
            setToastText("Server Offline!!!")
            setToastHidden(false)
        })
        client.verifySecret().then(res => {
            if (res) {
                console.log("Indiana Jones è felice!!!")
            } else {
                console.log("Indiana Jones è molto triste :(")
            }
        }).catch(err => console.log("Indiana Jones è molto triste :("))
    }, [])

    let  mainContainerStyle = {
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    }
    let toastStyle = {
        display: toastHidden ? "none" : "block"
    }
    return (
        <div className="App">
            <div className="main-container" style={mainContainerStyle}>
                <div className="toast-response" style={toastStyle}>
                    <div className="toast-response__close" onClick={handleToastClose}>x</div>
                    <div className="toast-response__title">Il Pappagallo risponde:</div>
                    <div className="toast-response__content">{toastText}</div>
                </div>
                <div className="form-container">
                    <input type="text" className="form-container__input" onInput={evt => setParrotRequest(evt.target.value)}/>
                    <div className="form-container__submit" onClick={submitParrot}>Invia</div>
                </div>
            </div>
        </div>
    )
}

export default App;
