import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import UserInfo from './UserInfo';
import RoomList from './RoomList';
import DmList from './DmList';
import './SidedrawerContent.css';
const SidebarContent = ({ user, signOut, rooms, users, show }) => {
    const publicRooms = [];
    const dmRooms = [];
    rooms.forEach(room => room.isPublic ? publicRooms.push(room) : dmRooms.push(room));

    return (
        <aside className={`Sidebar ${css(styles.sidebar)} ${show ? `sidedrawer open` : `sidedrawer`}`}>
            <UserInfo
                signOut={signOut}
                user={user} />
            <h1 className={css(styles.h1)}>babble </h1>
            <nav className={`RoomList ${css(styles.roomList)}`}>
                <RoomList
                    rooms={publicRooms}
                    users={users} />
                <DmList
                    rooms={dmRooms}
                    users={users} />
            </nav>
        </aside>
    )
}

const styles = StyleSheet.create({
    sidebar: {
        height: '100%',
        backgroundColor: '#333344',
        color: 'rgba(255, 255, 255, 0.8)',
        width: '15rem',
        padding: '1rem 0',
        flexDirection: 'column',
        position: 'fixed',
        transform: 'translateX(-100%)',
        transition: 'transform 0.3s ease-out',

        '@media (min-width:768px)': {
            display: 'flex',
            position: 'unset',
            transform: 'translateX(0)',
        }
    },

    roomList: {
        padding: '0 1rem'
    },

    h1: {
        color: 'white',
        fontSize: '1.2rem',
        marginTop: 0,
        padding: '0 1rem'
    }

})


export default SidebarContent;