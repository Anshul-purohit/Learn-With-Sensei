import React from 'react';
import { useShared } from '../SharedContext';
import UserProfile from './UserProfile';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {

    const navigate = useNavigate();
    const {user} = useShared();
    console.log(user);


    const handleLogoutClick = () => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/v1/users/logout',
          }).then(function (response) {
                console.log(response)
                navigate('/login');
            });
    }

  return (
    <nav className="navbar navbar-dark navbar-expand-sm">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbar-list-4"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbar-list-4">
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg"
                width="40"
                height="40"
                className="rounded-circle"
                alt="User"
              />
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <Link to='/profile'>Profile</Link>
                <br />
                <button onClick={() => {handleLogoutClick()}}>logout</button>
                <Link></Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
