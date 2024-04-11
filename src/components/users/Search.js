import React, { Component } from "react";

class Search extends Component {
    state = {
        text: "",
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
        return (
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
        );
    }
}

export default Search;
