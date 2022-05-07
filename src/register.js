// React.
import React from 'react'

// Etc.
import * as common from './common'

// CSS.
import classes from './css/register.css'

const initialState = {
    email: '',
    name: '',
    password: '',

    popoverMessage: '',
    showPopover: false,

    busy: false
}

export const Register = (props) => {
    const [ state, setState ] = React.useState(initialState)

    const hendleOnChange = (key, value) => {
        setState({ ...state, [key]: value })
    }

    const handleOnClick = async (event) => {
        if (state.email && state.name && state.password) {
            const args = {}

            args.method = 'POST'
            args.body = {}
            args.body.userEmail = state.email
            args.body.userName = state.name
            args.body.userPassword = state.password

            setState({ ...state, busy: true })

            const { userId } = await common.request2Api('/register', args)

            if (userId) {
                setState({
                    ...state,

                    popoverMessage: 'User created successfully! You can now login!',
                    showPopover: true,

                    busy: false
                })

            } else {
                // FIXME: Show the error message on screen.

                setState({ ...state, busy: false })
            }
        }
    }

    return ( <>
        <div className={ classes['app-centered-page'] }>
            <div className={ classes['register'] }>
                <h1>Create your account!</h1>

                <label>EMAIL</label>
                <input type='email' value={ state.email } onChange={ (event) => hendleOnChange('email', event.target.value) } />

                <label>NAME</label>
                <input type='text' value={ state.name } onChange={ (event) => hendleOnChange('name', event.target.value) } />

                <label>PASSWORD</label>
                <input type='password' value={ state.password } onChange={ (event) => hendleOnChange('password', event.target.value) } />

                <button type='button' onClick={ handleOnClick }>Register</button>
                <p>Already have an account? {' '} <common.Link to='/login'>Login</common.Link></p>
            </div>

            <common.Popover shown={ state.showPopover } message={ state.popoverMessage } onClose={ () => { setState({ ...state, showPopover: false }) } } />
        </div>

        <common.LoadingOverlay active={ state.busy } />
    </> )
}
