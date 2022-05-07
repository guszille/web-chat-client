// React.
import React from 'react'

// Etc.
import * as common from './common'

// CSS.
import classes from './css/home.css'

const initialState = {
    roomId: '',

    busy: false
}

export const Home = (props) => {
    const [ state, setState ] = React.useState(initialState)

    const hendleOnChange = (key, value) => {
        setState({ ...state, [key]: value })
    }

    const handleOnClickToJoinARoom = (event) => {

    }

    const handleOnClickToCreateNewRoom = (event) => {

    }

    return ( <>
        <div className={ classes['app-centered-page'] }>
            <div className={ classes['home'] }>
                <h2>Join a room!</h2>

                <label>ROOM ID</label>
                <input type='text' value={ state.roomId } onChange={ (event) => hendleOnChange('roodId', event.target.value) } />

                <button type='button' onClick={ handleOnClickToJoinARoom }>Join</button>

                <span></span>

                <h2>Create new room!</h2>

                <button type='button' onClick={ handleOnClickToCreateNewRoom }>Create</button>
            </div>
        </div>

        <common.LoadingOverlay active={ state.busy } />
    </> )
}
