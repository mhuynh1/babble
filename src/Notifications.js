import React, { Component } from 'react'

class Notifications extends Component {
    state = {}

    render() {
        return (
            <span className="Notifications" style={styles.span}>5</span>
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
