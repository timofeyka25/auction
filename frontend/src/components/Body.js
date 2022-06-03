import React from "react";
import logoImg from "../assets/logo.png";
import {Login} from "./Login";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectUser} from "../store/userSlice";
import {Register} from "./Register";
import {axiosPrivate} from "../api/axios";
import MainBody from "./MainBody";
import {reset} from "../store/pageSlice";
// import Account from "./Account";

const LOGOUT_URL = "/auth/logout";

export default function Body() {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectUser);

    // const [data, setData] = useState([]);

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
        dispatch(reset())
    }


    return (
        <div>
            <nav className="container navbar sticky-top navbar-light bg-light">
                <div className="container-fluid">
                    <div className="navbar-brand">
                        <img src={logoImg} alt="logo" height="75"/>
                    </div>
                    <div className="d-flex">
                        <div className="col">
                            <div className="btn btn-outline-secondary mx-2 "
                                 onClick={(e) => handleCategories(e)}>
                                Categories
                            </div>
                            {currentUser ? (
                                <>
                                    {/*<Account />*/}
                                    <div className="btn btn-outline-secondary mx-2 ">
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
