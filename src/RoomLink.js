import React from 'react';
import { NavLink } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import Notifications from './Notifications';

const RoomLink = ({ roomName, isPublic, user, currentRoom }) => {
    return (
        <NavLink
            to={isPublic ? `/rooms/${roomName}` : `/dm/${roomName}`}
            className={`${css(styles.link)} ${currentRoom === roomName && css(styles.activeRoom)}`}
        >
            <li className={`${css(styles.item)}`}>
                {roomName}
                {roomName !== currentRoom && <Notifications currentRoom={currentRoom} user={user} roomName={roomName} />}
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
export default RoomLink;