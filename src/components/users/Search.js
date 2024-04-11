import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {
    state = {
        text: "",
    };

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
    };

    onSubmit = (event) => {
        event.preventDefault();
        this.props.searchUsers(this.state.text);
        this.setState({ text: "" });
    };

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    render() {
        const { showClear, clearUsers } = this.props;

        return (
            <div>
                <form className="form" onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        name="text"
                        placeholder="Search user..."
                        value={this.state.text}
                        onChange={this.onChange.bind(this)}
                    />
                    <input
                        type="submit"
                        value="Search"
                        className="btn btn-dark btn-block"
                    />
                </form>
                {showClear && (
                    <button
                        className="btn btn-light btn-block"
                        onClick={clearUsers}
                    >
                        Clear
                    </button>
                )}
            </div>
        );
    }
}

export default Search;
