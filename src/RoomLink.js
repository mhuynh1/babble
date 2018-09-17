import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import NotificationsBadge from './NotificationsBadge';


const RoomLink = ({ roomName, isPublic, currentRoom, notifications, user }) => {
    let count;
    if (notifications) count = notifications[user.uid]
    return (
        <NavLink
            to={isPublic ? `/rooms/${roomName}` : `/dm/${roomName}`}
            className={`${css(styles.link)} ${currentRoom.name === roomName && css(styles.activeRoom)}`}
        >
            <li className={`${css(styles.item)}`}>
                {roomName}
                {roomName !== currentRoom.name && count > 0 && <NotificationsBadge count={count}/>}
            </li>
        </NavLink>
    )
}

const styles = StyleSheet.create({
    link: {
        display: 'flex',
        textDecoration: 'none',
        color: 'rgba(255, 255, 255, 0.8)',
        margin: '0 -1rem',
        padding: '.25rem 1rem 0.35rem',

        ':before': {
            content: '"# "',
        },

        ':hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
        },
    },
    activeRoom: {
        background: '#5c6bc0',

        ':hover': {
            backgroundColor: '#5c6bc0',
        },
    },
    item: {
        marginLeft: '0.5rem'
    },

})

const mapStateToProps = state => {
    return { 
        currentRoom: state.currentRoom,
        user: state.user
    }
}

export default connect(mapStateToProps)(RoomLink);