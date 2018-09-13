import React from 'react';
import {connect} from 'react-redux'

import Avatar from './Avatar';
import SignOutButton from './SignOutButton';

const UserInfo = ({ user, signOut }) => {
    return (
        <div className="UserInfo" style={styles.userInfo}>
            <Avatar user={user} />
            <div style={styles.rightSide}>
                <div className="user" style={styles.user}>
                    {user.displayName}
                </div>
                <SignOutButton signOut={signOut} />
            </div>
        </div>)
}
const styles = {
    userInfo: {
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
    },
    rightSide: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'

    },
    user: {
        flex: 1,
        maxWidth: '120px',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    }
}
const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserInfo);