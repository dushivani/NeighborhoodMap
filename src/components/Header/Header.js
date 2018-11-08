import React from 'react';
import PropTypes from 'prop-types';
import Toggle from './Toggle';

const Header = ({ showPlaceList }) => (
  <header>
    <h1 id="page-header">
      Bhubaneswar
    </h1>
    {/* Toggle Component - Hamburger menu icon */}
    <Toggle showPlaceList={showPlaceList} />
  </header>
);

// Add PropTypes validation
Header.propTypes = {
  showPlaceList: PropTypes.func.isRequired,
};

export default Header;
