import React, { Fragment, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import GithubContext from "../../context/github/githubContext";
import Search from "../users/Search";
import Users from "../users/Users";

const Home = () => {
    const githubContext = useContext(GithubContext);
    const match = useParams();

    useEffect(() => {
        githubContext.getUsers(match.login);
        // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <Search />
            <Users />
        </Fragment>
    );
};

export default Home;
