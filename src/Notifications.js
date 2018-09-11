import React, { Component } from 'react'

import base from './base'
class Notifications extends Component {
    state = {
        notifications: '',
    }

    // notifications
    //     roomName:{
    //         uid: 'unreadNum',
    //         uid2: 'unreadNum',
    //         uid3: 'unreadNum',
    //         uid4: 'unreadNum',
    //         uid5: 'unreadNum',
    //         uid6: 'unreadNum',
    //     },
    //     roomName2:{
    //         uid: 'unreadNum',
    //         uid2: 'unreadNum'
    //     }     

    componentDidMount() {
      

        base.listenTo(`messages/${this.props.roomName}`, {
            context: this,
            then(data){
                this.setState({notifications: data.length});
            }
        })
    }

    render() {
        return (
            <span className="Notifications" style={styles.span}>{this.state.notifications}</span>
        )
    }
}

const styles = {
    span: {
        background: '#ff3333',
        padding: '0px 10px 3px',
        borderRadius: '11px',
        fontSize: '.8rem',
        letterSpacing: '.5px'
    }
}
export default Notifications;
