// React.
import React from 'react'

// CSS.
import classes from './css/room.css'

const initialState = {
    users: [
        { id: '', avatarUrl: '', name: 'Gustavo Zille' },
    ],
    messages: []
}

export const Room = (props) => {
    const [state, setState] = React.useState(initialState)

    return (
        <div className={ classes['room'] }>
            <div className={ classes['room-connected-users'] }>
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

            <div className={ classes['room-message-list'] }>

            </div>

            <div className={ classes['room-message-input'] }>
                <textarea></textarea>
                <button>Send</button>
            </div>
        </div>
    )
}
