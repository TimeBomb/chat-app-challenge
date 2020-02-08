import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { ActionCreators } from '../../redux/actions';
import styles from './styles.css';

function NameInput({ onSave, savedName }) {
	const dispatch = useDispatch();
	const [name, setName] = useState(savedName);
	const inputRef = useRef(null);

	// This component should auto-focus its input field when rendered
	useEffect(() => {
		inputRef.current.focus();
	}, [inputRef]);

	const handleNameChange = event => {
		setName(event.currentTarget.value);
	};

	const handleSaveName = event => {
		event.preventDefault();

		dispatch(ActionCreators.setName(name));
		onSave();
	};

	return (
		<form className={styles.nameInputForm} onSubmit={handleSaveName}>
			<input
				className={styles.nameInput}
				type="text"
				value={name}
				onChange={handleNameChange}
				ref={inputRef}
			/>
		</form>
	);
}

export { NameInput };
