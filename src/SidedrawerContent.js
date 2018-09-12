import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import UserInfo from './UserInfo';
import RoomList from './RoomList';
import DmList from './DmList';
import './SidedrawerContent.css';

const SidedrawerContent = ({ user, signOut, rooms, users, show }) => {
    const publicRooms = [];
    const dmRooms = [];
    rooms.forEach(room => room.isPublic ? publicRooms.push(room) : dmRooms.push(room));

    return (
        <aside className={`Sidedrawer ${css(styles.sidedrawer)} ${show ? `sidedrawer open` : `sidedrawer`}`}>
            <UserInfo
                signOut={signOut}
                user={user}
            />
            <h1 className={css(styles.h1)}>babble </h1>
            <nav className='RoomList'>
                <RoomList
                    rooms={publicRooms}
                    user={user}
                    users={users} />
                <DmList
                    rooms={dmRooms}
                    user={user}
                    users={users} />
            </nav>
        </aside>
    )
}

const styles = StyleSheet.create({
    sidedrawer: {
        zIndex: 3,
        backgroundColor: 'rgb(111, 104, 101)',
        color: 'rgba(255, 255, 255, 0.8)',
        width: '15rem',
        padding: '1rem',
        flexDirection: 'column',
        position: 'fixed',
        transform: 'translateX(-100%)',
        transition: 'transform 0.3s ease-out',

        '@media (max-width:767px)': {
            height: '100%',
        },

        '@media (min-width:768px)': {
            display: 'flex',
            position: 'unset',
            transform: 'translateX(0)',
        }
    },

    h1: {
        color: 'white',
        fontSize: '1.2rem',
        marginTop: 0,
    }

})




export default SidedrawerContent;