import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'; // Import icons

function NavBar({ isScrolled, texts, getTotalCartUnits, toggleLanguage }) {
  const location = useLocation(); // Safely using useLocation inside the Router

  const renderLogo = () => {
    if (location.pathname === '/divartsity/') {
      return <img src={`/divartsity/images/logo-${isScrolled ? 'fixed' : 'normal'}.png`} alt="Logo" />;
    } else {
      return <img src='/divartsity/images/logo-fixed.png' alt="Logo" />;
    }
  };

  return (
    <nav className={`nav row middle center ${isScrolled ? 'fixed' : ''}`}>
      <div className='content row'>
        <NavLink exact className={`logo row ${isScrolled ? '' : ' center'}`} to="/divartsity/">
          {renderLogo()}
        </NavLink>

        <ul className='row middle'>
          <li>
            <NavLink exact to="/divartsity/" end>
              {texts.home}
              {/* Add an icon if needed */}
            </NavLink>
          </li>
          <li>
            <NavLink to="/divartsity/about">
              {texts.about}
              {/* Add an icon if needed */}
            </NavLink>
          </li>
          <li>
            <NavLink to="/divartsity/cart" className={`cart ${getTotalCartUnits() === 0 ? 'empty' : ''}`}>
              <FontAwesomeIcon icon={faShoppingBag} />
              {getTotalCartUnits() === 0 ? null : (
                <span className='cartCounter'>{getTotalCartUnits()}</span>
              )}
            </NavLink>
          </li>
          <li>
            <button onClick={toggleLanguage}>
              {texts.toggleLanguage}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
