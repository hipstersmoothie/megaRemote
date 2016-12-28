import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import { Link } from 'react-router';

import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import TV from 'material-ui/svg-icons/hardware/tv';
import Movie from 'material-ui/svg-icons/maps/local-movies';
import Media from 'material-ui/svg-icons/notification/live-tv';

const recentsIcon = <FontIcon className="fa fa-bolt" />;
const nearbyIcon = <IconLocationOn />;
const tvIcon = <TV />;
const movieIcon = <Movie />;
const mediaIcon = <Media />;

/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
function BottomNav(props) {
  let selected;

  if (props.location && props.location.includes('quick')) {
    selected = 0;
  } else if (props.location && props.location.includes('devices')) {
    selected = 1;
  } else if (props.location && props.location.includes('media')) {
    selected = 2;
  } else if (props.location && props.location.includes('addMovie')) {
    selected = 3;
  } else if (props.location && props.location.includes('addTv')) {
    selected = 4;
  }

  return (
    <Paper className={props.className} zDepth={1} style={{ position: 'fixed', width: '100%', bottom: 0 }}>
      <BottomNavigation selectedIndex={selected}>
        <BottomNavigationItem
          label="Quick"
          icon={recentsIcon}
          containerElement={<Link to="/quick" />}
        />
        <BottomNavigationItem
          label="Devices"
          icon={nearbyIcon}
          containerElement={<Link to="/devices" />}
        />
        <BottomNavigationItem
          label="Media"
          icon={mediaIcon}
          containerElement={<Link to="/media" />}
        />
        <BottomNavigationItem
          label="+Movies"
          icon={movieIcon}
          containerElement={<Link to="/addMovies" />}
        />
        <BottomNavigationItem
          label="+TV"
          icon={tvIcon}
          containerElement={<Link to="/addTv" />}
        />
      </BottomNavigation>
    </Paper>
  );
}

BottomNav.propTypes = {
  className: React.PropTypes.string,
  location: React.PropTypes.string
};

export default BottomNav;
