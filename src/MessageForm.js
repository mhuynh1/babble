import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
class MessageForm extends Component {

    state = {
        body: ''
    }

    handleChange = e => {
        this.setState({ body: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        this.props.addMessage(this.state.body)
        this.setState({ body: '' })
    }
    render() {
        return (
            <form
                className={`MessageForm ${css(styles.messageForm)}`}
                onSubmit={this.handleSubmit}
            >
                <div className={`chatIcon ${css(styles.chatIcon)}`}>
                    <i className="fas fa-comment-alt"></i>
                </div>
                <input
                    required
                    autoFocus
                    type="text"
                    name="body"
                    className={css(styles.input)}
                    placeholder="Type a message..."
                    value={this.state.body}
                    onChange={this.handleChange}
                />
                <button type="submit" className={css(styles.button)}>
                    <i className="fa fa-paper-plane" title="Send"></i>
                </button>
            </form>
        )
    }
}

const styles = StyleSheet.create({
    messageForm: {
        backgroundColor: 'white',
        height: '2.5rem',
        display: 'flex',
        alignItems: 'stretch',
        border: '2px solid #6f6865',
        borderRadius: '6px',
        padding: '0 2px 2px',
        margin: '0 1rem 1rem'
    },
    chatIcon: {
        display: 'flex',
        borderRadius: '0.5rem',
        alignItems: 'center',
        backgroundColor: 'white',
        color: '#ccc',
        padding: '0 0.5rem',
        fontDize: '1.2rem',
    },
    input: {
        flex: 1,
        fontSize: '1.2rem',
        border: 0,
        ':focus': {
            outline: 0
        }
    },
    button: {
        fontSize: '1.5rem',
        backgroundColor: 'transparent',
        color: '#1A8FE3',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        borderTopRightRadius: '0.5rem',
        borderBottomRightRadius: '0.5rem',
        border: 'none',
        outline: 'none'
    }

})
export default MessageForm;