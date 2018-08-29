import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Select from 'react-select';

class RoomForm extends Component {
    state = {
        room: {
            name: '',
            description: '',
            isPublic: true,
            users: []
        }
    }

    handleChange = e => {
        const room = { ...this.state.room }
        const target = e.target
        const value = target.type === 'checkbox' ? target.checked : target.value


        room[target.name] = value
        this.setState({ room })
    }

    handleSelectChange = (selectedValue) => {
        const room = { ...this.state.room }
        room.users = selectedValue
        
        this.setState({ room })
        console.log(selectedValue)
    }

    users = () => {
        return Object.keys(this.props.users).map(uid => {
            const user = this.props.users[uid]
            return {
                value: uid,
                label: `${user.displayName} (${user.email})`
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.addRoom(this.state.room)
        this.props.history.goBack()
    }

    render() {
        return (
            <div className={`RoomForm ${css(styles.roomForm)}`}>
                <main className={css(styles.main)}>
                    <h2 className={css(styles.h2)}>Create a new room</h2>
                    <form className={css(styles.form)} onSubmit={this.handleSubmit}>
                        <p className="inputGroup">
                            <label className={css(styles.label)}>
                                <input
                                    type="checkbox"
                                    name="isPublic"
                                    checked={this.state.room.isPublic}
                                    onChange={this.handleChange}
                                />
                                Public
                                </label>
                        </p>
                        <p className="inputGroup">
                            <label className={css(styles.label)} htmlFor="name">Room name:</label>
                            <input
                                autoFocus
                                required
                                type="text"
                                name="name"
                                className={css(styles.input, styles.textInput)}
                                value={this.state.room.name}
                                onChange={this.handleChange}
                            />
                        </p>
                        <p className="inputGroup">
                            <label className={css(styles.label)} htmlFor="description">Room description:</label>
                            <input
                                autoFocus
                                required
                                type="text"
                                name="description"
                                className={css(styles.input, styles.textInput)}
                                value={this.state.room.description}
                                onChange={this.handleChange}
                            />
                        </p>
                        {!this.state.room.isPublic && (<div>
                            <label
                                htmlFor="users"
                                className={css(styles.label)}
                            >
                                Add users
                            </label>
                            <Select
                                isMulti
                                name="users"
                                options={this.users()}
                                value={this.state.room.users}
                                onChange={this.handleSelectChange}
                            />
                        </div>)}
                        <div className={css(styles.buttonContainer)}>
                            <button type="button" className={css(styles.button, styles.cancel)} onClick={this.props.history.goBack}>Cancel</button>
                            <button className={css(styles.button)} type="submit">Create Room</button>
                        </div>
                    </form>
                </main>
            </div>
        )
    }
}

const styles = StyleSheet.create({
    roomForm: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f6f6f6',
        zIndex: 1000,
    },
    title: {
        color: '#ff3344',
        fontWeight: 400,
        lineHeight: '80px',
        fontSize: '2rem',
    },
    main: {
        flex: 1,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: '0 auto',
        paddingBottom: '3rem',
        width: '40rem',
    },
    form: {
        backgroundColor: 'white',
        boxShadow: '0 1px 1px rgba(0,0,0,.1)',
        marginBottom: '2rem',
        padding: '0 2rem 2rem',
    },
    label: {
        display: 'block',
        textTransform: 'uppercase',
        color: '#999',
    },
    input: {
        fontSize: '1.5rem',
        border: 0,
        borderBottom: '1px solid black',
        margin: '1rem auto',
        textAlign: 'center',
        padding: '0.5rem',
        ':focus': {
            outline: 0,
        },
    },
    textInput: {
        width: '20rem',
    },
    h2: {
        fontWeight: 'normal',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    button: {
        display: 'block',
        padding: '1rem',
        margin: '0 1rem',
        fontSize: '1.2rem',
        borderRadius: '1rem',
        backgroundColor: '#ff3333',
        color: 'white',
        width: '10rem',
        cursor: 'pointer',
        outline: 0,
    },
    cancel: {
        backgroundColor: 'white',
        color: '#666',
    },
})

export default RoomForm;