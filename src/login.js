// React.
import React from 'react'

// Etc.
import * as common from './common'

// CSS.
import classes from './css/login.css'

const initialState = {
    email: '',
    password: '',

    busy: false
}

export const Login = (props) => {
    const [ state, setState ] = React.useState(initialState)
    const [ accessToken, setAccessToken ] = common.useAccessToken()

    const hendleOnChange = (key, value) => {
        setState({ ...state, [key]: value })
    }

    const handleOnClick = async (event) => {
        if (state.email && state.password) {
            const args = {}

            args.method = 'POST'
            args.body = {}
            args.body.userEmail = state.email
            args.body.userPassword = state.password

            setState({ ...state, busy: true })

            const { accessToken } = await common.request2Api('/login', args)

            if (accessToken) {
                setState({ ...state, busy: false })

                setAccessToken(accessToken)

                common.navigateTo('/')

            } else {
                // FIXME: Show the error message on screen.

                setState({ ...state, busy: false })
            }
        }
    }

    return ( <>
        <div className={ classes['app-centered-page'] }>
            <div className={ classes['login'] }>
                <h1>Welcome!</h1>

                <label>EMAIL</label>
                <input type='email' value={ state.email } onChange={ (event) => hendleOnChange('email', event.target.value) } />

                <label>PASSWORD</label>
                <input type='password' value={ state.password } onChange={ (event) => hendleOnChange('password', event.target.value) } />
                <a href='/password-recovery'>Forgot your password?</a>

                <button type='button' onClick={ handleOnClick }>Login</button>
                <p>Need an account? {' '} <common.Link to='/register'>Register</common.Link></p>
            </div>
        </div>

        <common.LoadingOverlay active={ state.busy } />
    </> )
}
