import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { requestPing } from './actions'

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const sendPing = () => { dispatch(requestPing()); }
    const intervalId  = setInterval(sendPing, 1000);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    const { pods, counters, latest } = this.props;
    return (
      <div className="App">
        <div>Sent: {counters.sent}<br />
        Received: {counters.received}</div>
        {pods.map((pod, index) => (
          <div key={index} className={pod.name === latest ? 'latest' : ''}>
            {pod.name} {pod.image}
          </div>)
        )}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(App)
