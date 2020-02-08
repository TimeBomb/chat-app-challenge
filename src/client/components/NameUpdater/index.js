import React, { useState, useRef } from 'react';

import { useSelector } from 'react-redux';
import { NameInput } from './NameInput';
import styles from './styles.css';

function NameUpdater() {
	const [isEditing, setIsEditing] = useState(false);
	const name = useSelector(state => state.name);

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleNameSaved = () => {
		setIsEditing(false);
	};

	return (
		<div>
			{isEditing ? (
				<div className={styles.editingText}>
					Your name: <NameInput onSave={handleNameSaved} savedName={name} /> Press enter
					to save it.
				</div>
			) : (
				<div className={styles.viewingText} onClick={handleEdit}>
					Your name: <span className={styles.name}>{name}</span>. Click here to change it.
				</div>
			)}
		</div>
	);
}

export { NameUpdater };
