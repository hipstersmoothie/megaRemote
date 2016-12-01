import React from 'react';
import { Link } from 'react-router';

import './Root.css';

const Header = () => (
  <Link to="/" >
    <div className="App-header">
      Geek Haus Enterainment Control
    </div>
  </Link>
);

export default Header;
