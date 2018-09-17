import React from 'react';

const NotificationsBadge = ({ count }) => {
    return (<span className="Notifications" style={styles.span}>{count}</span>)
}

const styles = {
    span: {
        background: '#ff3333',
        padding: '0px 10px 3px',
        borderRadius: '11px',
        fontSize: '.8rem',
        letterSpacing: '.5px',
        position: 'absolute',
        right: '1rem',
    }
}

export default NotificationsBadge;
