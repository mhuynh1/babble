import React from 'react';
import { NavLink } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import Notifications from './Notifications';

const RoomLink = ({ roomName, isPublic, user, currentRoom }) => {
    return (
        <li className={css(styles.item)}>
            <NavLink
                to={isPublic ? `/rooms/${roomName}` :  `/dm/${roomName}` }
                className={css(styles.link)}
            >
                {roomName}
            </NavLink>
            {roomName !== currentRoom && <Notifications currentRoom={currentRoom} user={user} roomName={roomName}/>}
        </li>
    )
}

const styles = StyleSheet.create({
    item: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '0.5rem'
    },
    link: {
        display: 'block',
        textDecoration: 'none',
        color: 'rgba(255, 255, 255, 0.8)',

        ':before': {
            content: '"# "',
        },

        ':hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
        },
    }
})
export default RoomLink;