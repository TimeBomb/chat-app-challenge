import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { ActionCreators } from '../../redux/actions';
import styles from './styles.css';

function ChatInput() {
	const [message, setMessage] = useState('');
	const dispatch = useDispatch();
	const inputRef = useRef(null);

	// On initial load of ChatInput (i.e. initial load of app), focus the input field
	useEffect(() => {
		inputRef.current.focus();
	}, [inputRef]);

	const handleMessageChange = event => {
		setMessage(event.currentTarget.value);
	};

	const handleSend = event => {
		event.preventDefault();

		setMessage(''); // Clear message from input upon sending
		dispatch(ActionCreators.sendMessage(message));
	};

	return (
		<form className={styles.ChatInput} onSubmit={handleSend}>
			<input
				className={styles.messageTextBox}
				type="text"
				value={message}
				onChange={handleMessageChange}
				ref={inputRef}
			/>
			<button
				className={styles.sendMessageButton}
				onClick={handleSend}
				disabled={message.length === 0}
			>
				Send
			</button>
		</form>
	);
}

export { ChatInput };
