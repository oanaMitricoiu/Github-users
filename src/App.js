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
import GithubState from "./context/github/GithubState";

const App = (props) => {
    const [alert, setAlert] = useState(null);
    // const [users, setUsers] = useState([]);

    // const getUsers = async () => {
    //     const data = await axios.get(
    //         `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    //     );
    //     return data.data;
    // };

    // useEffect(() => {
    //     const fetchData = async () => {
    //         setLoading(true);
    //         const _users = await getUsers();
    //         setUsers(_users);
    //         setLoading(false);
    //     };
    //     fetchData();
    // }, []);

    //Set alert
    const showAlert = (msg, type) => {
        setAlert({ msg, type });
        setTimeout(() => {
            setAlert(null);
        }, 3000);
    };

    return (
        <GithubState>
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
                                        <Search setAlert={showAlert} />
                                        <Users />
                                    </>
                                }
                            />
                            <Route path="/about" element={<About />} />
                            <Route
                                path="/user/:login"
                                element={<User {...props} />}
                            />
                        </Routes>
                    </div>
                </div>
            </Router>
        </GithubState>
    );
};

export default App;
