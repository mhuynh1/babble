import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';

import { addCurrentRoom } from './redux/actions'
import base from './base'
import SidedrawerContent from './SidedrawerContent'
import Chat from './Chat'
import RoomDmForm from './RoomDmForm';
import Backdrop from './Backdrop';

class Main extends Component {
    state = {
        rooms: {},
        sideDrawerOpen: false,
        notifications: {}
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

        this.syncNotificationsCounts()
    }

    componentDidUpdate(prevProps) {
        const { roomName } = this.props.match.params
        if (prevProps.match.params.roomName !== roomName) {
            this.setRoomFromRoute()
        }
    }

    componentWillUnmount() {
        base.removeBinding(this.notificationsRef)
    }

    syncNotificationsCounts = () => {
        if (this.notificationsRef) {
            base.removeBinding(this.notificationsRef)
        }

        this.notificationsRef = base.syncState(`notifications`, {
            context: this,
            state: 'notifications'
        })
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
            this.props.addCurrentRoom({ currentRoom })
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
            room.name = room.users.map(u => u.label.split(' ')).map(n => n[0]).join(', ')
        }
        rooms[room.name] = room
        this.setState({ rooms }, this.setRoomNotificationsEndpoint(room))
    }

    setRoomNotificationsEndpoint = (room) => {
        const notifications = { ...this.state.notifications }

        notifications[room.name] = {}


        if (!room.isPublic) {
            room.users.forEach(u => {
                notifications[room.name][u.value] = 0
            })
            this.setState({ notifications })
        } else {
            this.getAllUids(room.name)
        }


    }

    getAllUids = (roomName) => {
        base.fetch('users', {
            context: this,
            then(data) {
                this.setAllNotifications(Object.keys(data), roomName)
            }
        })
    }

    setAllNotifications = (uids, roomName) => {
        const notifications = { ...this.state.notifications }
        notifications[roomName] = {}
        uids.forEach(uid => {
            notifications[roomName][uid] = 0
        })
        this.setState({ notifications })
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
                        render={routerProps => (<RoomDmForm users={this.props.users} addRoom={this.addRoom} {...routerProps} />)}
                    />
                    <Route path="/new-direct-message"
                        render={routerProps => (<RoomDmForm users={this.props.users} addRoom={this.addRoom} {...routerProps} />)}
                    />
                    <Route path="/:roomtype/:roomName"
                        render={routerProps => (
                            <Fragment>
                                <SidedrawerContent
                                    {...routerProps}
                                    show={this.state.sideDrawerOpen}
                                    rooms={this.filteredRooms()}
                                    notifications={this.state.notifications}
                                    signOut={this.props.signOut}
                                    users={this.props.users}
                                />

                                {
                                    this.state.sideDrawerOpen
                                    && <Backdrop handleBackdropClick={this.handleBackdropClick} />
                                }

                                <Chat
                                    handleToggleDrawer={this.handleToggleDrawer}
                                    removeRoom={this.removeRoom}
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

const mapStateToProps = state => {
    return {
        currentRoom: state.currentRoom,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return { addCurrentRoom: currentRoom => dispatch(addCurrentRoom(currentRoom)) }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);