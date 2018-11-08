import React, { Component } from 'react';
import './App.css';
import { Header, Search } from './components';

class NeighborhoodApp extends Component {
// App's internal state
  state = {
    isListOpen: false,
  }

  /**
   * Even handler for Toggle component,it sets the app state to
   * indicate if list view is open or closed based on hamburger menu icon
   */
  showListView = () => {
    this.setState(prevState => ({
      isListOpen: !prevState.isListOpen,
    }));
  }

  render() {
    const { isListOpen } = this.state;
    return (
      <div className="App">
        <Header showPlaceList={this.showListView} />
        <Search isListOpen={isListOpen} />
      </div>
    );
  }
}

export default NeighborhoodApp;
