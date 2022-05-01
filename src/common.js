// React.
import React from 'react'

// CSS.
import classes from './css/common.css'

// Functions to manage a HTTP request.
export const request2Api = async (resource, init) => {
    const { method, headers, body } = init
    const params = {}

    if (method) {
        params.method = method

    } else {
        throw new Error('No method was provided!')
    }

    if (headers) {
        params.headers = headers

    } else {
        params.headers = new Headers()

        // Default MIME types.
        // See https://www.iana.org/assignments/media-types/media-types.xhtml.
        //
        params.headers.append('Accept', 'application/json')
        params.headers.append('Content-Type', 'application/json')
    }

    if (method === 'POST') {
        if (body && Object.keys(body).length > 0) {
            params.body = JSON.stringify(body)

        } else {
            throw new Error('Request method is POST but no body was provided!')
        }
    }

    try {
        const response = await fetch(`${process.env.WEBAPI_URL}${resource}`, params)
        const data = await response.json()

        if (!response || Object.keys(data) > 0) {
            throw new Error('Empty response received!')

        } else {
            return data
        }

    } catch (error) {
        console.error(error) // Log error anyway.

        return { error: error }
    }
}

// Hook to manage the WebSocket connection.
export const useWebSocket = (url, protocols=[]) => {
    const [conn, defineConnection] = React.useState(null)

    React.useEffect(() => {
        const socket = new WebSocket(url, protocols)

        if (socket) {
            socket.addEventListener('open', (event) => {
                console.log('Connection established!')
            })
        }

        defineConnection(socket)
    }, [])

    return conn
}

// Components. {{{
export const Popover = ({ message, shown, onClose, ...props }) => {
    return (
        <div className={ classes['popover'] } shown={ shown ? 'true' : 'false' }>
            <p>{ message }</p>
            <button type='button' onClick={ onClose }>X</button>
        </div>
    )
}
// }}}
