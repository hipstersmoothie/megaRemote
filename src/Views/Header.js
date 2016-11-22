import React from 'react';
import { Link } from 'react-router';

import './Root.css';

const Header = () => (
  <Link to="/" >
    <div className="App-header" style={{ marginBottom: '15px' }}>
      <h2>Geek Haus Enterainment Control</h2>
    </div>
  </Link>
);

export default Header;
