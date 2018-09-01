import React from 'react';
import { StyleSheet, css } from 'aphrodite';

export const CancelButton = ({ history }) => {
    return (
        <button type="button" className={css(styles.button, styles.cancel)} onClick={history.goBack}>Cancel</button>
    )
}

export const SubmitButton = (props) => {
    return (<button className={css(styles.button)} type="submit">{props.btnText}</button>)
}

const styles = StyleSheet.create({
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
