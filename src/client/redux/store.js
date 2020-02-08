import { createStore, applyMiddleware } from 'redux';
import socketMiddleware from './socketMiddleware';
import { Actions } from './actions';

const INITIAL_STATE = {
	messages: [],
	name: 'Guest',
	messagesCount: 0,
};

function reducer(state = INITIAL_STATE, action) {
	const { payload, type } = action;
	switch (type) {
		case Actions.receivedMessage:
			return {
				...state,
				messages: [...state.messages, payload],
				messagesCount: state.messagesCount + 1,
			};
		case Actions.sendMessage:
			return {
				...state,
				messages: { ...state.messages, payload },
			};
		case Actions.setName:
			return {
				...state,
				name: payload.name,
			};
		default:
			return state;
	}
}

export default createStore(reducer, applyMiddleware(socketMiddleware));
