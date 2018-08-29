import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import base from './base'
import Sidebar from './Sidebar'
import Chat from './Chat'
import RoomForm from './RoomForm';

class Main extends Component {
    state = {
        currentRoom: {},
        rooms: {},
        users: {}
    }

    componentDidMount() {
        base.syncState('rooms', {
            context: this,
            state: 'rooms',
            defaultValue: {
                general: {
                    name: 'general',
                    description: 'a safe space for general topics'
                }
            },
            then: this.setRoomFromRoute,
        })
    }

    componentDidUpdate(prevProps) {
        const { roomName } = this.props.match.params
        if (prevProps.match.params.roomName !== roomName) {
            this.setRoomFromRoute()
        }
    }

    setRoomFromRoute = () => {
        const { roomName } = this.props.match.params
        if (roomName) {
            this.setCurrentRoom(roomName)
        }
    }

    setCurrentRoom = roomName => {
        const currentRoom = this.state.rooms[roomName]

        if (currentRoom) {
            this.setState({ currentRoom })
        } else {
            this.loadValidRoom()
        }
    }

    loadValidRoom = () => {
        const roomName = Object.keys(this.state.rooms).find(roomName => this.state.rooms[roomName])

        this.props.history.push(`/rooms/${roomName}`)
    }

    addRoom = room => {
        const rooms = { ...this.state.rooms }
        rooms[room.name] = room

        this.setState({ rooms })
    }

    removeRoom = room => {
        const rooms = { ...this.state.rooms }
        rooms[room.name] = null

        this.setState({ rooms }, this.loadValidRoom,)
    }

    render() {
        return (
            <div className='Main' style={styles}>
                <Switch>
                    <Route path="/new-room"
                        render={routerProps => (<RoomForm users={this.props.users} addRoom={this.addRoom} {...routerProps} />)}
                    />
                    <Route path="/rooms/:roomName"
                        render={() => (
                            <Fragment>
                                <Sidebar
                                    rooms={this.state.rooms}
                                    signOut={this.props.signOut}
                                    users={this.props.users}
                                    user={this.props.user}
                                />
                                <Chat
                                    removeRoom={this.removeRoom}
                                    user={this.props.user}
                                    currentRoom={this.state.currentRoom}
                                />
                            </Fragment>
                        )} />
                    <Route render={() => (
                        <Redirect to="rooms/general" />
                    )} />
                </Switch>

            </div>
        )
    }
}
const styles = {
    display: 'flex',
    alignItems: 'stretch',
    height: '100vh'
}
export default Main;