import React, { Component } from 'react';
import { connect } from 'react-redux';

import ChatHeader from './ChatHeader'
import MessageList from './MessageList'
import MessageForm from './MessageForm'
import base from './base'
class Chat extends Component {
    state = {
        messages: [],
    }

    componentDidMount() {
        this.getLatestMessages()
        if (this.props.currentRoom.name) {
            this.resetNotificationCount(this.props.currentRoom.name, this.props.user.uid)
        }

    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentRoom.name !== this.props.currentRoom.name) {
            this.getLatestMessages()
            this.resetNotificationCount(prevProps.currentRoom.name, this.props.user.uid)
        }
    }

    componentWillUnmount() {
        base.removeBinding(this.messagesRef)
    }

    getLatestMessages = () => {
        //syncState allows 2 way binding, so need to check if it's already listening for change to remove current endpoint listener before listening on new endpoint
        if (this.messagesRef) {
            base.removeBinding(this.messagesRef)
        }

        // listen for changes at new endpoint
        this.messagesRef = base.syncState(`messages/${this.props.currentRoom.name}`, {
            context: this,
            state: 'messages',
            asArray: true
        })
    }

    removeMessages = (currentRoom) => {
        //remove messages associated with Room before removing Room
        this.setState({ messages: null }, this.props.removeRoom(currentRoom))
    }

    addMessage = body => {
        const messages = [...this.state.messages]
        const user = this.props.user

        messages.push({ id: `${user.uid}-${Date.now()}`, user, body, createdAt: Date.now() })
        this.setState({ messages }, this.getRoomNotificationCounts)
    }

    updateNotificationCounts = (membersCounts) => {
        const url = this.props.currentRoom.name

        Object.keys(membersCounts).forEach(uid => {
            let count = membersCounts[uid] + 1


            base.update(`notifications/${url}`, {
                data: { [uid]: count },
                then(err) {
                    if (err) console.log(err)
                }
            })
        })
    }

    getRoomNotificationCounts = () => {
        //dm rooms don't get badge updates bc url string has a space
        const url = this.props.currentRoom.name

        base.fetch(`notifications/${url}`, {

            context: this,
            then(data) {

                delete data[this.props.user.uid]
                this.updateNotificationCounts(data)
            }
        })
    }

    resetNotificationCount = (roomName, uid) => {
        base.update(`notifications/${roomName}`, {
            data: { [uid]: 0 },
            then(err) {
                if (err) console.log(err)
            }
        })
    }

    updateEmojiCount = (message) => {
        const messages = { ...this.state.messages }
        messages[message.key] = message
        this.setState({ messages })
    }

    render() {
        return (
            <div className="Chat" style={styles.chat}>
                <ChatHeader
                    handleToggleDrawer={this.props.handleToggleDrawer}
                    removeRoom={this.props.removeRoom}
                    removeMessages={this.removeMessages}
                />
                <MessageList
                    updateEmojiCount={this.updateEmojiCount}
                    messages={this.state.messages}
                />
                <MessageForm
                    addMessage={this.addMessage}
                />
            </div>
        )
    }
}
const styles = {
    chat: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
    }

}

const mapStateToProps = state => {
    return { 
        currentRoom: state.currentRoom,
        user: state.user,
    }
}
export default connect(mapStateToProps)(Chat);