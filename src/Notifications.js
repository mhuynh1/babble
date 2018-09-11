import React, { Component } from 'react'

import base from './base'
class Notifications extends Component {
    state = {
        notifications: '',
    }

    /*
    notifications
        roomName:{
            uid: 'unreadNum',
            uid2: 'unreadNum',
            uid3: 'unreadNum',
            uid4: 'unreadNum',
            uid5: 'unreadNum',
            uid6: 'unreadNum',
        },
        roomName2:{
            uid: 'unreadNum',
            uid2: 'unreadNum'
        } 
    */

    componentDidMount() {
        base.syncState(`notifications/${this.props.roomName}/${this.props.user.uid}`, {
            context: this,
            state: 'notifications',
        })

    }


    render() {
        const count = this.state.notifications
        return (
            <React.Fragment>
                {
                    count > 0
                        ? <span className="Notifications" style={styles.span}>{this.state.notifications}</span>
                        : null
                }
            </React.Fragment>
        )
    }
}

const styles = {
    span: {
        background: '#ff3333',
        padding: '0px 10px 3px',
        borderRadius: '11px',
        fontSize: '.8rem',
        letterSpacing: '.5px',
        position: 'absolute',
        right: '1rem',
    }
}
export default Notifications;
