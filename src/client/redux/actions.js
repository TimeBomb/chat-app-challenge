const Actions = {
	receivedMessage: 'RECEIVED_MESSAGE',
	initializeSocket: 'INITIALIZE_SOCKET',
	sendMessage: 'SEND_MESSAGE',
	setName: 'SET_NAME',
};
const ActionCreators = {
	receivedMessage: payload => {
		return {
			type: Actions.receivedMessage,
			payload,
		};
	},
	initializeSocket: () => {
		return {
			type: Actions.initializeSocket,
		};
	},
	sendMessage: message => {
		return {
			type: Actions.sendMessage,
			payload: {
				message,
			},
		};
	},
	setName: name => {
		return {
			type: Actions.setName,
			payload: {
				name,
			},
		};
	},
};
export { Actions, ActionCreators };
