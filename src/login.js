// React.
import React from 'react'

// Other JS Libs.
import {
    Link
} from 'react-router-dom'

// CSS.
import classes from './css/login.css'

const initialState = {
    email: '',
    password: ''
}

export const Login = (props) => {
    const [ state, setState ] = React.useState(initialState)

    const hendleOnChange = (key, value) => {
        setState({ ...state, [key]: value })
    }

    return (
        <div className={ classes['app-centered-page'] }>
            <div className={ classes['login'] }>
                <h1>Welcome!</h1>

                <label>EMAIL</label>
                <input type='email' value={ state.email } onChange={ (event) => hendleOnChange('email', event.target.value) } />

                <label>PASSWORD</label>
                <input type='password' value={ state.password } onChange={ (event) => hendleOnChange('password', event.target.value) } />
                <Link to='/password-recovery'>Forgot your password?</Link>

                <button type='button'>Login</button>
                <p>Need an account? {' '} <Link to='/register'>Register</Link></p>
            </div>
        </div>
    )
}
