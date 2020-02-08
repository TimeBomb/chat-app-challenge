import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ActionCreators } from './redux/actions';
import { MessagesList } from './components/MessagesList';
import { ChatInput } from './components/ChatInput';
import { NameUpdater } from './components/NameUpdater';
import styles from './styles.css';
import './global.css';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(ActionCreators.initializeSocket());
	}, [dispatch]);

	return (
		<div className={styles.App}>
			<MessagesList />
			<div className={styles.footer}>
				<ChatInput />
				<NameUpdater />
			</div>
		</div>
	);
}

export default App;
