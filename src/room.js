// React.
import React from 'react'

// CSS.
import classes from './css/room.css'

const initialState = {
    roomId: '',

    users: [
        { id: '', avatarUrl: '', name: 'Gustavo Zille' },
    ],

    messages: []
}

export const Room = (props) => {
    const [ state, setState ] = React.useState(initialState)

    return ( <>
        <div className={ classes['app-centered-page'] }>
            <div className={ classes['room'] }>
                <div>
                    <h2>Room { state.roomId }</h2>

                    <hr />

                    <div className={ classes['connected-users'] }>
                        { state.users.map((x, i) => (
                            <div key={ i }>
                                <span>
                                    { x.avatarUrl ? <img src={ x.avatarUrl }></img>
                                    : <p>{ x.name.charAt(0).toUpperCase() }</p> }
                                </span>
                                <p>{ x.name }</p>
                            </div>
                        )) }
                    </div>
                </div>

                <div>
                    <div className={ classes['messages'] }>

                    </div>

                    <div className={ classes['message-area'] }>
                        <textarea></textarea>
                        <button>Send</button>
                    </div>
                </div>
            </div>
        </div>
    </> )
}
