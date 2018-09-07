import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import 'emoji-mart/css/emoji-mart.css'
import { Picker, Emoji } from 'emoji-mart';

import './emojiBtn.css'
import Avatar from './Avatar';
import Metadata from './Metadata';
class Message extends Component {
    state = {
        showEmojiPicker: false,
    }


    showEmojiPicker = () => {
        this.setState({ showEmojiPicker: true })
    }

    hideEmojiPicker = () => {
        this.setState({ showEmojiPicker: false })
    }

    handleSelectEmoji = message => emoji => {
        /*
        message: {
            id: '',
            body: '',
            reactions: {
                ':smileyFace:' : {
                    uid#1: 'dudley canbers'
                    uid#2: 'john mitchell'
                },
                ':kissyFace: {
                    uid#0: 'Amy Adams'
            }
        }
        */
        if (!message.reactions) {
            message.reactions = { [emoji.colons]: { [message.user.uid]: message.user.displayName } }
        } else {
            message.reactions[emoji.colons] = { [message.user.uid]: message.user.displayName }
        }

        this.props.updateMessage(message)
    }


    render() {
        const { message } = this.props

        const emojiList = message.reactions ?
            Object.keys(message.reactions).map(r => {
                return <li key={r} className={`emoji ${css(styles.li)}`}>
                    <Emoji emoji={r} size={14} />
                    <span className={`count ${css(styles.count)}`}>{Object.keys(message.reactions[r]).length}</span>
                </li>
            })
            : null
        return (
            <div className={`Message ${css(styles.message)}`} onClick={this.state.showEmojiPicker ? this.hideEmojiPicker : null} >
                <Avatar user={message.user} />
                <div className="details" style={styles.details}>
                    <Metadata message={message} />
                    <div className="body">{message.body}</div>
                    <ul className={`emojiGroup ${css(styles.ul)}`}>
                        {emojiList}
                    </ul>
                    <button className={`emojiBtn ${css(styles.emojiBtn)}`} onClick={this.showEmojiPicker}>
                        <i className="far fa-smile"></i>
                        <i className={`fa fa-plus ${css(styles.plusIcon)}`}></i>
                    </button>
                </div>
                {
                    this.state.showEmojiPicker &&
                    <div className={`emojiPicker ${css(styles.emojiPicker)}`}>
                        <Picker
                            set='emojione'
                            showPreview={false}
                            onSelect={this.handleSelectEmoji(message)}
                        />
                    </div>
                }
            </div >
        )
    }

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
    },
    emojiPicker: {
        position: 'absolute',
        zIndex: 1,
        top: '5px',
        right: '2rem',
    },

    ul: {
        display: 'flex',
        padding: 0,
        margin: '5px 0 0 0'
    },

    li: {
        display: 'flex',
        alignItems: 'center',
        padding: '3px 6px',
        listStyle: 'none',
        marginRight: '5px',
        border: '1px solid #03A9F4',
        borderRadius: '4px'

    },
    count: {
        fontSize: '0.8rem',
        fontWeight: 'bold',
        marginLeft: '3px',

    }

})
export default Message;