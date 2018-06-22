import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import actionTypes from '../../constants/actionTypes';
import {logoutUser} from "../../actions/authActions_aj";
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';

class Layout extends Component {

    logout(){
        this.props.dispatch(logoutUser());
    }

    render() {
        const userLoggedIn = (
            <li>
                 <p className="navbar-text">Logged in as : { this.props.username}</p>
                <p className="navbar-text"><a onClick={this.logout.bind(this)}>Logout</a></p>
            </li>

        );
        const userNotLoggedIn = (<li><Link to={'/loginselection'}><span className="glyphicon glyphicon-log-in"></span>Login</Link></li>)
        return (
            <div>
                    <nav className="navbar navbar-inverse">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle" data-toggle="collapse"
                                        data-target="#myNavbar">
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <a className="navbar-brand" href="#">LECTURE CAPTURING SYSTEM</a>
                            </div>
                            <div className="collapse navbar-collapse" id="myNavbar">
                                <ul className="nav navbar-nav">
                                    <li className="active"><Link to={'/'}>Home</Link></li>
                                    <li><Link to={'/about'}>About</Link></li>
                                </ul>
                                <ul className="nav navbar-nav navbar-right">
                                    {this.props.loggedIn === true ? userLoggedIn : userNotLoggedIn}
                                </ul>
                            </div>
                        </div>
                    </nav>
                <div>
                    { this.props.children }
                </div>
                <div>
                    <footer className="container-fluid text-center">
                        <p>&copy; 2018 SLIIT Research Project</p>
                    </footer>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        username: state.auth.username
    }
}

export default withRouter(connect(mapStateToProps)(Layout));

// export default Layout;