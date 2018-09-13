import React, { Component } from 'react';
import { connect } from 'react-redux';

import base from './base';
class NotificationsBadge extends Component {
    state = {
        notifications: '',
    }

    componentDidMount() {
        this.getLatestNotificationsCounts()
    }

    componentDidUpdate(_prevProps, prevState) {
        if (prevState.notifications[this.props.user.uid] !== this.state.notifications[this.props.user.uid]) {
            this.getLatestNotificationsCounts()
        }
    }

    getLatestNotificationsCounts = () => {
        if (this.notificationsRef) {
            base.removeBinding(this.notificationsRef)
        }

        this.notificationsRef = base.syncState(`notifications/${this.props.roomName}`, {
            context: this,
            state: 'notifications',
        })
    }

    render() {
        const count = this.state.notifications[this.props.user.uid]
        return (
            <React.Fragment>
                {
                    count > 0
                        ? <span className="Notifications" style={styles.span}>{count}</span>
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

const mapStateToProps = state => {
    return { user: state.user }
}
export default connect(mapStateToProps)(NotificationsBadge);
