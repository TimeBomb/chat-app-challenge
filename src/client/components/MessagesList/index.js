import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import randomcolor from 'randomcolor';

import styles from './styles.css';

function MessagesList() {
	const messages = useSelector(state => state.messages);
	const messagesRef = useRef(null);

	// Scroll to the bottom - to the latest message - when receiving a new message
	useEffect(() => {
		messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
	}, [messages]);

	const timestampToStr = timestamp => {
		const date = new Date(timestamp);
		const timeStr = date.toLocaleString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
		});

		// We want to use the 12-hour clock but not show AM/PM
		// Therefore we omit the last 3 characters, i.e. " AM" / " PM"
		return timeStr.substr(0, timeStr.length - 3);
	};

	return (
		<div className={styles.MessagesList} ref={messagesRef}>
			<div className={styles.messages}>
				{messages.length === 0 ? (
					<div className={styles.noMessagesText}>
						No one has sent a message yet. Try saying hello :-)
					</div>
				) : (
					messages.map(messagePayload => {
						const { name, message, id, userId } = messagePayload;
						// Assign a psuedorandom hex color to each user id,
						// with each unique user's color being consistent
						// among all chat users
						const nameColor = randomcolor({
							luminosity: 'light',
							seed: userId,
						});
						const timeStr = timestampToStr(messagePayload.timestamp);
						return (
							<div key={id} className={styles.message}>
								<span className={styles.timestamp}>{timeStr}</span>{' '}
								<span
									style={{
										color: nameColor,
									}}
								>
									{name}
								</span>
								: {message}
							</div>
						);
					})
				)}
			</div>
		</div>
	);
}

export { MessagesList };
