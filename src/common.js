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
        // Only log errors on DEBUG mode.
        // console.error(error)

        return { error: error }
    }
}

// Function to dispatch a navigation event.
export const navigateTo = (path, params={}) => {
    window.history.pushState(params, '', path)

    const navigationEvent = new PopStateEvent('navigate')

    window.dispatchEvent(navigationEvent)
}

// Hook to manage the WebSocket connection.
export const useWebSocket = (url, protocols=[]) => {
    const [ conn, defineConnection ] = React.useState(null)

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

// Hook to manage and storage the access/session token.
export const useAccessToken = () => {
    const [ accessToken, setAccessToken ] = React.useState('')

    const wrappedSetToken = (token) => {
        localStorage.setItem('accessToken', token)

        setAccessToken(token)
    }

    React.useEffect(() => {
        const token = localStorage.getItem('accessToken')

        if (token) { wrappedSetToken(token) }
    }, [])

    return [ accessToken, wrappedSetToken ]
}

// Components. {{{
export const Route = ({ path, component, ...props }) => {
    const [ currentLocation, setCurrentLocation ] = React.useState({
        pathname: window.location.pathname,
        params: {
            dynamic: {},
            queryString: {}
        }
    })

    const comparePathnames = (base, current) => {
        base = base.split('/')
        current = current.split('/')

        if (base.length != current.length) {
            return false
        }

        for (const entry of current.entries()) {
            const [ index, param ] = entry

            if (base[index].charAt(0) != ':' && base[index] != param) {
                return false
            }
        }

        return true
    }

    React.useEffect(() => {
        const onLocationChange = () => {
            const params = { dynamic: {}, queryString: {} }
            const [ _, qsp ] = window.location.href.split('?')
            const base = path.split('/')

            try {
                // Managing dynamic parameters in URL.
                for (const entry of window.location.pathname.split('/').entries()) {
                    const [ index, param ] = entry

                    if (base.length > index && base[index].charAt(0) == ':') {
                        const name = base[index].slice(1)

                        params.dynamic[name] = param
                    }
                }

                // Managing query string parameters in URL.
                if (qsp) {
                    for (const param of qsp.split('&')) {
                        const [ key, value ] = param.split('=')

                        params.queryString[key] = value
                    }
                }

                setCurrentLocation({ pathname: window.location.pathname, params })

            } catch (error) {
                console.error('Malformed URL provided!') // FIXME: Temporary error log.

                throw error
            }
        }

        window.addEventListener('navigate', onLocationChange)

        return () => window.removeEventListener('navigate', onLocationChange)
    }, [])

    if (comparePathnames(path, currentLocation.pathname)) {
        return <>{ React.createElement(component, currentLocation.params) }</>

    } else {
        return <>{/* Empty return. */}</>
    }
}

export const Link = ({ to, children, ...props }) => {
    const preventReload = (event) => {
        event.preventDefault()

        navigateTo(to)
    }

    return (
        <a href={ to } onClick={ preventReload }>{ children }</a>
    )
}

export const NoMatch = (props) => {
    return ( <>
        <p>404 - Not Found</p>
        {/* Temporary component to handle uncreated pages. */}
    </> )
}

export const Popover = ({ message, shown, onClose, ...props }) => {
    return (
        <div className={ classes['popover'] } shown={ shown ? 'true' : 'false' }>
            <p>{ message }</p>
            <button type='button' onClick={ onClose }>X</button>
        </div>
    )
}

export const LoadingOverlay = ({ active, ...props }) => {
    return (
        <div className={ classes['loading-overlay'] } active={ active ? 'true' : 'false' }>
            <div>{/* Loader */}</div>
        </div>
    )
}
// }}}
