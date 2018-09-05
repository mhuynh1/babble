import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import SidedrawerToggle from './SidedrawerToggle';

const ChatHeader = ({ currentRoom, removeMessages, handleToggleDrawer }) => {

    return (
        <header className={`ChatHeader ${css(styles.chatHeader)}`}>
            <div className={`roomAnnouncement ${css(styles.roomAnnouncement)}`}>
                <SidedrawerToggle handleToggleDrawer={handleToggleDrawer} />
                <div>
                    <h2 className={css(styles.h2)}>{currentRoom.name}</h2>
                    <p className={css(styles.p)}>{currentRoom.description}</p>
                </div>
            </div>

            <button
                className={css(styles.button)}
                onClick={() => removeMessages(currentRoom)}
            >
                <i className="far fa-trash-alt"></i>
            </button>
        </header>
    )
}

const styles = StyleSheet.create({
    chatHeader: {
        backgroundColor: ' #f3f3f3',
        borderBottom: '1px solid #ccc',
        padding: '0.5rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    roomAnnouncement: {
        display: 'flex',
        alignItems: 'center'
    },
    h2: {
        display: 'flex',
        fontSize: '1.1rem',
        margin: 0,
    },
    p: {
        color: '#999',
        margin: 0,
        fontSize: '0.8rem',
    },
    button: {
        outline: 0,
        padding: 0,
        border: 0,
        backgroundColor: 'transparent',
        cursor: 'pointer',
        fontSize: '1rem',
        color: 'rgba(0,0,0, 0.3)',

        ':hover': {
            color: 'rgba(0,0,0, 0.7)',
            transition: 'color 0.25s ease-out',
        }
    }

})

export default ChatHeader;