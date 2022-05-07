// React.
import React from 'react'
import ReactDOMClient from 'react-dom/client'

// Components.
import { Login } from './login'
import { Register } from './register'
import { Home } from './home'
import { Room } from './room'

// Etc.
import * as common from './common'

// CSS.
import './css/global.css'

const initialState = {}

const App = () => {
    const [ state, setState ] = React.useState(initialState)
    const [ accessToken, setAccessToken ] = common.useAccessToken()
    // const socket = common.useWebSocket(process.env.WEBSOCKET_URL)

    React.useEffect(() => {
        if (!accessToken) {
            common.navigateTo('/login')
        }
    }, [])

    return ( <>
        <common.Route path='/' component={ Home } />
        <common.Route path='/login' component={ Login } />
        <common.Route path='/register' component={ Register } />
        <common.Route path='/rooms/:id' component={ Room } />
    </> )
}

// Rendering on HTML.
ReactDOMClient.createRoot(document.getElementById('root')).render(<App />)
