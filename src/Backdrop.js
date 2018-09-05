import React from 'react';

const Backdrop = ({handleBackdropClick}) => (<div className="Backdrop" style={styles.backdrop} onClick={handleBackdropClick}/>)

const styles = {
    backdrop: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        background: 'rgba(0,0,0,0.3)',
        zIndex: 1,
    }
}
export default Backdrop;