import React from 'react';
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
        padding: '0 1rem',
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
export default UserInfo;