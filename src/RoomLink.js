import React from 'react';
import { NavLink } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';

const RoomLink = ({ roomName }) => {
    return (
        <li className={css(styles.item)}>
            <NavLink
                to={`/rooms/${roomName}`}
                className={css(styles.link)}
            >
                {roomName}
            </NavLink>
        </li>
    )
}

const styles = StyleSheet.create({
    item: {
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