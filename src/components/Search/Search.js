import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import Filter from './Filter';
import PlacesList from './PlacesList';
import GoogleMap from './GoogleMap';

class Search extends Component {
  /**
   * When user type in to filter place, the typed input will only be
   * processed 300ms after the user's last keystroke.
   */
  updateQuery = debounce((query) => { this.updateQueryState(query); }, 300);

  // Add PropTypes validation
  static propTypes = {
    isListOpen: PropTypes.bool.isRequired,
  };

  // App's internal state
  state = {
    locations: [],
    filterQuery: '',
    selectedPlaceTitle: '',
  }

  componentDidMount() {
    // Call to foursquare API
    fetch('https://api.foursquare.com/v2/venues/search?ll=20.339457,85.807439&client_id=ACRQ0IACKTUFPMQ0N3OOZ4RWIXXKXBYRK0ZCSGMM3VQOVECY&client_secret=1FM1ED5G1B4EGHDJIJJA42ANZGGDG25RJ2IMG13TTAR2ON1A&limit=25&v=20180707')
      .then((response) => {
        if (response.status === 200) {
          // return the venue details from the API if request is successful
          return response.json();
        }
        // Throw data not found error if API endpoint respond with status other that 200
        throw Error('No data found for co-ordinates: 22.5726,88.3639');
      })
      .then((data) => {
        if (data.response && data.response.venues) {
          const locations = data.response.venues;
          // Add location details to app internal state
          this.setState({ locations });
        } else {
          throw Error('No venues detail found for co-ordinates: 22.5726,88.3639');
        }
      })
      .catch(error => this.handleRequestError(error));
  }

  /**
   * catch handler for foursquare API request error
   * it add HTML element with error message to UI
   */
  handleRequestError = (error) => {
    const listElement = window.document.getElementById('places-list');
    const errorPara = window.document.createElement('p');
    errorPara.className = 'error';
    errorPara.textContent = error;
    errorPara.style = 'color: red';
    listElement.appendChild(errorPara);
  }

  /**
   * This handler function sets the filterQuery
   */
  updateQueryState = (filterQuery) => {
    this.setState({ filterQuery });
  }


  /**
   * This function sets the state property selectedPlaceTitle if a user clicks or select
   * any place from the place listing.
   */
  selectPlace = (selectedPlaceTitle) => {
    this.setState({ selectedPlaceTitle });
  }

  render() {
    const { locations, filterQuery, selectedPlaceTitle } = this.state;
    const { isListOpen } = this.props;
    let filteredLocations;
    if (filterQuery.trim()) {
      // Generate the RegEx for user input text
      const match = new RegExp(escapeRegExp(filterQuery.trim()), 'i');

      /**
        * Filter the location data based on input text against location name
      */
      filteredLocations = locations.filter(location => match.test(location.name));
    } else {
      // Use the default set of location if the user enters black text
      filteredLocations = locations;
    }

    return (
      <main aria-label="Neighborhood Map" role="main">
        <section id="placelistview" className={isListOpen ? 'listview open' : 'listview'}>
          {/* Search Input component */}
          <Filter updateQuery={this.updateQuery} />
          {/* PlaceList component - By default adds all the places as list items on UI */}
          <PlacesList
            locations={filteredLocations}
            selectPlace={this.selectPlace}
          />
        </section>
        {/* GoogleMap component - By default adds map with markers for  all the places on UI */}
        <GoogleMap
          locations={filteredLocations}
          filterText={filterQuery}
          selectedPlaceTitle={selectedPlaceTitle}
        />
      </main>
    );
  }
}

export default Search;
