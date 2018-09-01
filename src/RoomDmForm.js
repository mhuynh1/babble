import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { CancelButton, SubmitButton } from './FormButtons';
import { NewRoomInputs, MultipleSelectInput } from './FormInputs';

class RoomDmForm extends Component {
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
        const { users } = this.props
        delete users[this.props.user.uid]
        return Object.keys(users).map(uid => {
            const user = this.props.users[uid]
            return {
                value: uid,
                label: `${user.displayName} (${user.email})`
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const { room } = this.state

        if (this.props.match.url === '/new-direct-message') {
            room.isDm = true
            room.isPublic = false
        }

        this.props.addRoom(room)
        this.props.history.goBack()
    }

    render() {
        return (
            <div className={`RoomDmForm ${css(styles.RoomDmForm)}`}>
                <main className={css(styles.main)}>
                    <h2 className={css(styles.h2)}>{this.props.match.url === '/new-direct-message' ? 'Direct Message' : 'Create New Room'}</h2>
                    <form className={css(styles.form)} onSubmit={this.handleSubmit}>
                        {
                            this.props.match.url === '/new-direct-message'
                                ? <MultipleSelectInput
                                    labelText='start a conversation'
                                    options={this.users()}
                                    value={this.state.room.users}
                                    handleSelectChange={this.handleSelectChange}
                                />
                                : <NewRoomInputs
                                    handleChange={this.handleChange}
                                    handleSelectChange={this.handleSelectChange}
                                    room={this.state.room}
                                />
                        }
                        {
                            !this.state.room.isPublic
                            && (<MultipleSelectInput
                                isMulti
                                name="users"
                                labelText="Add users"
                                className={`Select-control ${css(styles.input)}`}
                                options={this.users()}
                                value={this.state.room.users}
                                onChange={this.handleSelectChange}
                                placeholder='add members'
                            />)
                        }
                        <div className={css(styles.buttonContainer)}>
                            <CancelButton history={this.props.history} />
                            <SubmitButton
                                url={this.props.match.url}
                                handleSubmit={this.handleSubmit}
                                btnText={this.props.match.url === '/new-direct-message' ? 'Go' : 'Create Room'}
                            />
                        </div>
                    </form>
                </main>
            </div>
        )
    }
}

const styles = StyleSheet.create({
    RoomDmForm: {
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
        padding: '2rem',
    },
    h2: {
        color: 'rgb(255, 51, 68)',
        fontWeight: 400,
        lineHeight: '80px',
        fontSize: '2rem',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
    }
})

export default RoomDmForm;