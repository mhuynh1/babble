import React from 'react';
import {StyleSheet, css} from 'aphrodite';
const SidedrawerToggle = ({handleToggleDrawer}) => {
    return (
        <button className={css(styles.button)} onClick={handleToggleDrawer}>
            <div className={css(styles.btnLine)} />
            <div className={css(styles.btnLine)} />
            <div className={css(styles.btnLine)} />
        </button>
    )
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '24px',
        width: '30px',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        boxSizing: 'border-box',
        marginRight: '15px',

        ':focus': {
            outline: 'none'
        },

        '@media (min-width: 768px)': {
            display: 'none',
        }
    },
    btnLine: {
        width: '30px',
        height: '2px',
        background: '#555'
    }
})


export default SidedrawerToggle;