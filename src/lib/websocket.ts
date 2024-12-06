import ReconnectingWebSocket from 'reconnecting-websocket';

const url = 'ws://localhost:8080/move';

export let socket = new ReconnectingWebSocket(url);

