import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';

import RoomLink from './RoomLink'
const DmList = ({ rooms }) => {
    return (
        <Fragment>
            <div className={css(styles.heading)}>
                <h2 className={css(styles.h2)}>Direct Message</h2>
                <Link to="/new-direct-message" className={css(styles.button)}>
                    <i className="fa fa-plus-circle" title="add room"></i>
                </Link>
            </div>
            <ul className={css(styles.list)}>
                {
                    rooms.map(
                        room => !room.isPublic && <RoomLink
                            isPublic={room.isPublic}
                            key={room.name}
                            roomName={room.name}
                        />
                    )
                }
            </ul>
        </Fragment>
    )
}
const styles = StyleSheet.create({
    h2: {
        fontSize: '1rem',
    },

    list: {
        listStyle: 'none',
        marginLeft: 0,
        paddingLeft: 0
    },

    heading: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        border: 0,
        backgroundColor: 'transparent',
        outline: 0,
        padding: 0,
        color: 'rgba(255,255,255,0.4)',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'color 0.25s ease-out',

        ':hover': {
            color: 'white',
        }
    },
})
export default DmList;
