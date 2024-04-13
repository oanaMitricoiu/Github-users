import React, { useContext } from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import GithubContext from "../../context/github/githubContext";

const Users = () => {
    const githhubContext = useContext(GithubContext);
    const { loading, users } = githhubContext;

    if (loading) {
        return <Spinner />;
    } else {
        return (
            <div style={userStyle}>
                {users.map((user) => (
                    <UserItem key={user.id} user={user} loading={loading} />
                ))}
            </div>
        );
    }
};

const userStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gridGap: "1rem",
};

export default Users;
