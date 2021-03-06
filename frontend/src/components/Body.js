import React from "react";
import logoImg from "../assets/logo.png";
import {Login} from "./Login";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectUser} from "../store/userSlice";
import {Register} from "./Register";
import {axiosPrivate} from "../api/axios";
import MainBody from "./MainBody";
import {load, reset} from "../store/pageSlice";

const LOGOUT_URL = "/auth/logout";

export default function Body() {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectUser);

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await axiosPrivate.post(LOGOUT_URL);
            dispatch(logout());
            dispatch(reset());
        } catch (err) {
            console.log(err);
        }
    };

    const handleCategories = (e) => {
        e.preventDefault()
        dispatch(load({page: -1}))
    }

    const handleAccount = (e) => {
        e.preventDefault()
        dispatch(load({page: 3}))
    }

    const handleAdminPanel = (e) => {
        e.preventDefault()
        dispatch(load({page: 4}))
    }


    return (
        <div>
            <nav className="container navbar sticky-top navbar-light bg-light">
                <div className="container-fluid">
                    <div className="navbar-brand">
                        <img src={logoImg} alt="logo" height="60"/>
                    </div>
                    <div className="d-flex">
                        <div className="col">
                            <div className="btn btn-outline-secondary mx-2 "
                                 onClick={(e) => handleCategories(e)}>
                                Categories
                            </div>
                            {currentUser?.role === 3 && (
                                <div
                                    onClick={(e) => handleAdminPanel(e)}
                                    className="btn btn-outline-secondary mx-2 "
                                >
                                    Admin panel
                                </div>
                            )}
                            {currentUser ? (
                                <>
                                    <div
                                        onClick={(e) => handleAccount(e)}
                                        className="btn btn-outline-secondary mx-2 "
                                    >
                                        {currentUser.username}
                                    </div>
                                    <div
                                        onClick={(e) => handleLogout(e)}
                                        className="btn btn-outline-secondary mx-2"
                                    >
                                        Logout
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Login/>
                                    <Register/>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <MainBody/>
        </div>
    );
}
