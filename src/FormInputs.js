import React, { Fragment } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Select from 'react-select'
export const NewRoomInputs = ({ room, handleChange }) => {
    return (
        <Fragment>
            <p className="inputGroup">
                <label className={css(styles.label)}>
                    <input
                        type="checkbox"
                        name="isPublic"
                        checked={room.isPublic}
                        onChange={handleChange}
                    />
                    Public
                </label>
            </p>
            <p className="inputGroup">
                <label className={css(styles.label)} htmlFor="name">
                    Room name:
                </label>
                <input
                    autoFocus
                    required
                    type="text"
                    name="name"
                    className={css(styles.input, styles.textInput)}
                    value={room.name}
                    onChange={handleChange}
                />
            </p>
            <p className="inputGroup">
                <label className={css(styles.label)} htmlFor="description">
                    Room description:
                </label>
                <input
                    required
                    type="text"
                    name="description"
                    className={css(styles.input, styles.textInput)}
                    value={room.description}
                    onChange={handleChange}
                />
            </p>
        </Fragment>
    )
}

export const DmInputs = ({ value, options, handleSelectChange }) => {
    return (
        <Fragment>
            <label
                htmlFor="users"
                className={css(styles.label)}
            >
                Add users
            </label>
            <Select
                isMulti
                name="users"
                className={`Select-control ${css(styles.input)}`}
                options={options}
                value={value}
                onChange={handleSelectChange}
                placeholder='add members'
            />
        </Fragment>
    )
}

const styles = StyleSheet.create({
    label: {
        display: 'block',
        textTransform: 'uppercase',
        color: '#999',
    },
    input: {
        fontSize: '1.5rem',
        border: 0,
        borderBottom: '1px solid black',
        margin: '1rem auto',
        textAlign: 'center',
        padding: '0.5rem',
        ':focus': {
            outline: 0,
        },
    }
})