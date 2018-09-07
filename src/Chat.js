import React, { Component } from 'react';

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
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentRoom.name !== this.props.currentRoom.name) {
            this.getLatestMessages()
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

        this.setState({ messages })
    }

    updateMessage = (message) => {
        const messages = {...this.state.messages}
        messages[message.key] = message
        this.setState({messages})
    }

    render() {
        return (
            <div className="Chat" style={styles.chat}>
                <ChatHeader
                    handleToggleDrawer={this.props.handleToggleDrawer}
                    removeRoom={this.props.removeRoom}
                    removeMessages={this.removeMessages}
                    currentRoom={this.props.currentRoom}
                />
                <MessageList
                    updateMessage={this.updateMessage}
                    user={this.props.user}
                    currentRoom={this.props.currentRoom}
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
        height: '100vh'
    }

}
export default Chat;