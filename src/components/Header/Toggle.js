import React, { Component } from 'react';

class Toggle extends Component {
  state = { isToggleOn: true }

  handleClick = () => {
    this.setState(prev => ({
      isToggleOn: !prev.isToggleOn,
    }));
    this.props.showPlaceList();
  }

  render() {
    const { isToggleOn } = this.state;
    return (
      <div className="menu_logo">
        <div
          id="menu"
          onClick={this.handleClick}
          onKeyDown={event => (event.keyCode === 13) && this.handleClick()}
          role="menu"
          tabIndex="0"
          aria-label="menu"
          aria-owns="mi-0 mi-1 mi-2 mi-3 mi-4 mi-5 mi-6 mi-7 mi-8 mi-9 mi-10 mi-11 mi-12 mi-13 mi-14 mi-15 mi-16 mi-17 mi-18 mi-19 mi-20 mi-21 mi-22 mi-23 mi-24"
        >
          {isToggleOn ? (
            <svg viewBox="0 0 41 41">
              <rect x="5" y="12" fill="currentColor" width="32px" height="2" />
              <rect x="5" y="21" fill="currentColor" width="32px" height="2" />
              <rect x="5" y="30" fill="currentColor" width="32px" height="2" />
            </svg>
          ) : (
            <svg viewBox="0 0 41 41">
              <path d="M5 12 L36 30" stroke="currentColor" strokeWidth="3" />
              <path d="M5 30 L36 12" stroke="currentColor" strokeWidth="3" />
            </svg>
          )
          }
        </div>
      </div>
    );
  }
}

export default Toggle;
