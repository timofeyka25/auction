import {Alert, Button, Form, Modal} from "react-bootstrap";
import React, {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {login} from "../store/userSlice";
import {axiosPrivate} from "../api/axios";
import {load} from "../store/pageSlice";

const LOGIN_URL = "/auth/sign-in";

export const Login = () => {
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState("");

    const usernameRef = useRef();
    const passwordRef = useRef();

    const dispatch = useDispatch();

    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);

    const submitForm = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axiosPrivate.post(
                LOGIN_URL,
                JSON.stringify({
                    username: usernameRef.current.value,
                    password: passwordRef.current.value,
                })
            );
            dispatch(
                login({
                    username: usernameRef.current.value,
                    token: response.data.token,
                    role: response.data.role_id,
                    loggedIn: true,
                }),
            );
            dispatch(load({page: 1}),)
            closeForm();
        } catch (err) {
            if (!err?.response) {
                setError("No Server Response");
                console.log(err);
            } else if (err.response?.status === 400) {
                setError("Missing Username or Password");
            } else if (err.response?.status === 401) {
                setError("This account is no longer active");
            } else {
                setError("Login Failed");
            }
        }
    };

    return (
        <>
            <div onClick={openForm} className="btn btn-outline-secondary mx-2">
                Sign in
            </div>
            <Modal centered show={showForm} onHide={closeForm}>
                <form onSubmit={submitForm}>
                    <Modal.Header>
                        <Modal.Title>Sign in</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" required ref={usernameRef} autoFocus/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required ref={passwordRef}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeForm}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Sign in
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
};
