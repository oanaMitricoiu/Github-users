import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = (props) => {
    const { title, icon } = props;
    return (
        <nav className="navbar bg-primary">
            <h1>
                <i className={icon} />
                {title}
            </h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
    );
};

Navbar.defaultProps = {
    title: "Github finder ",
    icon: "fa fa-brands fa-github",
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
};

export default Navbar;
