import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";
import Spinner from "./../layout/Spinner";
import Repos from "../repos/Repos";
import GithubContext from "../../context/github/githubContext";

// export function withRouter(Children) {
//     return (props) => {
//         const match = { params: useParams() };
//         return <Children {...props} match={match} />;
//     };
// }

const User = () => {
    const githubContext = useContext(GithubContext);
    const match = useParams();

    const { getUser, loading, user, getUserRepos, repos } = githubContext;

    useEffect(() => {
        getUser(match.login);
        getUserRepos(match.login);
        // eslint-disable-next-line
    }, []);

    const {
        company,
        name,
        avatar_url,
        location,
        bio,
        blog,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable,
    } = user;

    if (loading) return <Spinner />;

    return (
        <>
            <Link to="/" className="btn btn-light">
                Back To Search
            </Link>
            Hirebale:{" "}
            {hireable ? (
                <i className="fas fa-check text-success" />
            ) : (
                <i className="fas fa-times-circle text-danger" />
            )}
            <div className="card grid-2">
                <div className="all-center">
                    <img
                        src={avatar_url}
                        alt="avatar"
                        className="round-image"
                        style={{ width: "150px" }}
                    />
                    <h1>{name}</h1>
                    <p>Location: {location} </p>
                </div>
                <div>
                    {bio && (
                        <>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </>
                    )}
                    <a href={html_url} className="btn btn-dark my-1">
                        Visit Github profile
                    </a>
                    <ul>
                        <li>
                            {login && (
                                <>
                                    <b>Username: </b>
                                    {login}
                                </>
                            )}
                        </li>

                        <li>
                            {company && (
                                <>
                                    <b>Company: </b>
                                    {company}
                                </>
                            )}
                        </li>
                        <li>
                            {blog && (
                                <>
                                    <b>Website: </b>
                                    {blog}
                                </>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="card text-center">
                <div className="badge badge-primary">
                    Followers: {followers}
                </div>
                <div className="badge badge-success">
                    Following: {following}
                </div>
                <div className="badge badge-light">
                    Public Repos: {public_repos}
                </div>
                <div className="badge badge-dark">
                    Public gists: {public_gists}
                </div>
            </div>
            <Repos repos={repos} />
        </>
    );
};

export default User;
