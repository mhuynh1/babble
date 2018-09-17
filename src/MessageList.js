import React, { Component } from 'react';
import { connect } from 'react-redux';

import Message from './Message'

class MessageList extends Component {

    componentDidUpdate(prevProps) {
        if (prevProps.messages.length < this.props.messages.length) {
            this.scrollToBottom()
        }
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
    }

    getPrevMsgUid = (index) => {
        const prevMsgUid = this.props.messages.length > 1
            ? this.props.messages[index - 1].user.uid
            : undefined
        return prevMsgUid
    }

    render() {
        const { messages, currentRoom, updateEmojiCount } = this.props
        return (
            <div className="MessageList" style={styles.messageList} >
                <div className="roomAnnouncement">
                    <h3 style={styles.h3}>#{currentRoom.name}</h3>
                    {currentRoom.isDm
                        ? <p>This is the very beginning of the direct message.</p>
                        : <p>{`This is the very beginning of the #${currentRoom.name} room.`}</p>
                    }
                </div>
                {messages.map(msg => (<Message key={msg.id} prevMsgUid={msg.key > 0 && this.getPrevMsgUid(msg.key)} message={msg} updateEmojiCount={updateEmojiCount} />))}
                <div ref={el => this.messagesEnd = el}></div>
            </div >
        )
    }
}

const styles = {
    messageList: {
        backgroundColor: 'white',
        flex: 1,
        padding: '1rem',
        overflowY: 'scroll',
    },
    h3: {
        fontSize: '1.5rem',
        margin: 0,
    }
}

const mapStateToProps = state => {
    return { currentRoom: state.currentRoom }
}

export default connect(mapStateToProps)(MessageList);