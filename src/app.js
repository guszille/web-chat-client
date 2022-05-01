// React.
import React from 'react'
import ReactDOMClient from 'react-dom/client'

// Other JS Libs.
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'

// Components.
import { Login } from './login'
import { Register } from './register'
import { Home } from './home'
import { Room } from './room'

// Etc.
import { useWebSocket } from './common'

// CSS.
import './css/global.css'

const initialState = {
    id: '',
    name: ''
}

const App = () => {
    const [ state, setState ] = React.useState(initialState)
    // const socket = useWebSocket(process.env.WEBSOCKET_URL)

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Home /> } />
                <Route path='login' element={ <Login /> } />
                <Route path='register' element={ <Register /> } />
            </Routes>
        </BrowserRouter>
    )
}

// Rendering on HTML.
ReactDOMClient.createRoot(document.getElementById('root')).render(<App />)
