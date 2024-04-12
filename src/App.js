import React, { useState, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = (props) => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const [repos, setRepos] = useState([]);

    const getUsers = async () => {
        const data = await axios.get(
            `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        return data.data;
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const _users = await getUsers();
            setUsers(_users);
            setLoading(false);
        };
        fetchData();
    }, []);

    //Search Github users
    const searchUsers = async (text) => {
        setLoading(true);
        const res = await axios.get(
            `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        setUsers(res.data.items);
        setLoading(false);
    };

    //Get single Github user
    const getUser = async (username) => {
        setLoading(true);
        const res = await axios.get(
            `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        setUser(res.data);
        setLoading(false);
    };

    //Get users repo
    const getUserRepos = async (username) => {
        setLoading(true);
        const res = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        setRepos(res.data);
        setLoading(false);
    };

    //Clear users from state

    const clearUsers = () => {
        setUsers([]);
        setLoading(false);
    };

    //Set alert
    const showAlert = (msg, type) => {
        setAlert({ msg, type });
        setTimeout(() => {
            setAlert(null);
        }, 3000);
    };

    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="container">
                    <Alert alert={alert} />

                    <Routes>
                        <Route
                            path="/"
                            element={
                                <>
                                    <Search
                                        searchUsers={searchUsers}
                                        clearUsers={clearUsers}
                                        setAlert={showAlert}
                                        showClear={
                                            users.length > 0 ? true : false
                                        }
                                    />
                                    <Users loading={loading} users={users} />
                                </>
                            }
                        />
                        <Route path="/about" element={<About />} />
                        <Route
                            path="/user/:login"
                            element={
                                <User
                                    {...props}
                                    getUser={getUser}
                                    getUserRepos={getUserRepos}
                                    user={user}
                                    loading={loading}
                                    repos={repos}
                                />
                            }
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
