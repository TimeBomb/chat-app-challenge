import { Actions, ActionCreators } from './actions';
import Events from '../../shared/events';

const socketMiddleware = ({ dispatch, getState }) => {
	let socket = null;

	const onMessage = payload => {
		const state = getState();

		// Upon our client receiving a message, we set its id.
		// Given state.messagesCount only ever increments, even if
		// state.messages ever changes, the id of each message remains
		// unique for the duration of the user's session
		// We use this id as the key when displaying it in <ChatBox>
		payload.id = state.messagesCount;
		dispatch(ActionCreators.receivedMessage(payload));
	};

	return next => action => {
		const state = getState();

		switch (action.type) {
			case Actions.initializeSocket:
				// If already connected, do nothing
				if (socket) return;

				socket = io();

				// When receiving chat message
				socket.on(Events.chatMessage, msg => {
					onMessage(msg);
				});
				break;

			case Actions.sendMessage:
				const messagePayload = {
					message: action.payload.message,
					name: state.name,
					timestamp: new Date().getTime(),
					userId: socket.id,
				};
				socket.emit(Events.chatMessage, messagePayload);

				// We want the store to update `messages` state immediately upon the user sending a message
				// as opposed to waiting for the socket.io server to receive the message and send it back to us
				onMessage(messagePayload);
				break;

			default:
				return next(action);
		}
	};
};

export default socketMiddleware;
