import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import './emojiBtn.css'
import Avatar from './Avatar';
import Metadata from './Metadata';

const Message = ({ message }) => {
    return (
        <div className={`Message ${css(styles.message)}`}>
            <Avatar user={message.user} />
            <div className="details" style={styles.details}>
                <Metadata message={message} />
                <div className="body">{message.body}</div>
                <button className={`emojiBtn ${css(styles.emojiBtn)}`}>
                    <i className="far fa-smile"></i>
                    <i className={`fa fa-plus ${css(styles.plusIcon)}`}></i>
                </button>
            </div>
        </div>
    )
}

const styles = StyleSheet.create({
    message: {
        display: 'flex',
        marginTop: '1rem',
        padding: '.5rem 1rem',
        position: 'relative',

        ':hover': {
            backgroundColor: '#f9f9f9',
        }
    },
    details: {
        flex: 1,
        paddingLeft: ' 0.5rem'
    },
    emojiBtn: {
        border: 0,
        outline: 0,
        padding: 0,
        color: '#ccc',
        backgroundColor: 'transparent',
        fontSize: '1rem',
        top: '0.5rem',
        right: '0.5rem',
        position: 'absolute'
    },

    plusIcon: {
        fontSize: '.5rem;',
        position: 'absolute',
        right: '-2px',
        background: '#fff',
        top: '-4px',
        padding: '1px 1px 1px 2px',
        borderRadius: '50%',

    }
})
export default Message;