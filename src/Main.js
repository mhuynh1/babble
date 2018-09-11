import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';

import base from './base'
import SidebarContent from './SidebarContent'
import Chat from './Chat'
import RoomDmForm from './RoomDmForm';
import Backdrop from './Backdrop';

class Main extends Component {
    state = {
        currentRoom: {},
        rooms: {},
        sideDrawerOpen: false
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
        const currentRoom = this.filteredRooms().find(room => room.name === roomName)

        if (currentRoom) {
            this.setState({ currentRoom })
        } else {
            this.loadValidRoom()
        }
    }

    loadValidRoom = () => {
        const roomName = this.filteredRoomNames().find(roomName => this.state.rooms[roomName])

        this.props.history.push(`/rooms/${roomName}`)
    }

    addRoom = room => {
        const rooms = { ...this.state.rooms }
        const { user } = this.props

        if (!room.isPublic) {
            room.users.push({
                label: `${user.displayName} (${user.email})`,
                value: user.uid
            })
        }

        if (room.isDm) {
            room.name = room.users.map(u => u.label.split(' ')).map(n => n[0]).join(', ')
        }

        rooms[room.name] = room
        this.setState({ rooms })
    }

    removeRoom = room => {
        const rooms = { ...this.state.rooms }
        rooms[room.name] = null

        this.setState({ rooms }, this.loadValidRoom)
    }

    filteredRooms = () => {
        return this.filteredRoomNames()
            .map(roomName => this.state.rooms[roomName])
    }

    filteredRoomNames = () => {
        //only show public rooms or rooms where user is in list
        return Object.keys(this.state.rooms)
            .filter(roomName => {
                const room = this.state.rooms[roomName]
                if (!room) return false
                return room.isPublic || this.isRoomMember(room)
            })
    }

    isRoomMember = (room) => {
        //check if currentUser is in list of users of private room
        const members = room.users || []
        return members.find(userOption => userOption.value === this.props.user.uid)
    }

    handleToggleDrawer = () => (
        this.setState(prev => ({ sideDrawerOpen: !prev.sideDrawerOpen }))
    )

    handleBackdropClick = () => (
        this.setState({ sideDrawerOpen: false })
    )


    render() {
        return (
            <div className={`Main ${css(styles.main)}`}>
                <Switch>
                    <Route path="/new-room"
                        render={routerProps => (<RoomDmForm user={this.props.user} users={this.props.users} addRoom={this.addRoom} {...routerProps} />)}
                    />
                    <Route path="/new-direct-message"
                        render={routerProps => (<RoomDmForm user={this.props.user} users={this.props.users} addRoom={this.addRoom} {...routerProps} />)}
                    />
                    <Route path="/:roomtype/:roomName"
                        render={routerProps => (
                            <Fragment>
                                <SidebarContent
                                    {...routerProps}
                                    currentRoom={this.state.currentRoom.name}
                                    show={this.state.sideDrawerOpen}
                                    rooms={this.filteredRooms()}
                                    // rooms={this.state.rooms}
                                    signOut={this.props.signOut}
                                    users={this.props.users}
                                    user={this.props.user}
                                />

                                {
                                    this.state.sideDrawerOpen
                                    && <Backdrop handleBackdropClick={this.handleBackdropClick} />
                                }

                                <Chat
                                    
                                    handleToggleDrawer={this.handleToggleDrawer}
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
const styles = StyleSheet.create({
    main: {
        '@media (min-width: 768px)': {
            display: 'flex',
            alignItems: 'stretch',
            height: '100vh'
        }
    }
})
export default Main;