import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './RegistAuthentificationHeader.css';

class RegistAuthentificationHeader extends Component {
    render() {
        return (
            <header className="app-header">
                <div>
                    <div className="app-options">
                        <nav className="app-nav">
                                { this.props.authenticated ? (
                                    <ul>
                                        <li>
                                            <NavLink to="/registration/profile">Profile</NavLink>
                                        </li>
                                        <li>
                                            <a onClick={this.props.onLogout}>Logout</a>
                                        </li>
                                    </ul>
                                ): (
                                    <ul>

                                    </ul>
                                )}
                        </nav>
                    </div>
                </div>
            </header>
        )
    }
}

export default RegistAuthentificationHeader;
