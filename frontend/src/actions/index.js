export const PING = 'PING';
export const PONG = 'PONG';

const BASE_URL = process.env.REACT_APP_BASE_URL || '';

export const sendRequest = () => ({
  type: PING,
});

export const receiveResponse = json => ({
  type: PONG,
  ...json,
});

export const requestPing = () => dispatch => {
  dispatch(sendRequest());
  return fetch(`${BASE_URL}/ping`)
    .then(response => response.json())
    .then(json => dispatch(receiveResponse(json)));
};
