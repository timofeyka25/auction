import {Alert, Button, Form, Modal} from "react-bootstrap";
import React, {useRef, useState} from "react";
import axios from "../api/axios";

const SIGNUP_URL = "/auth/sign-up";

export const Register = () => {
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState("");

    const passwordRef = useRef();
    const cmfPasswordRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const usernameRef = useRef();

    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);
    const submitForm = async (e) => {
        e.preventDefault();
        setError("");

        if (passwordRef.current.value !== cmfPasswordRef.current.value) {
            return setError("Passwords does not match");
        }

        let newUser = {
            first_name: firstNameRef.current.value,
            last_name: lastNameRef.current.value,
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        };

        try {
            await axios.post(SIGNUP_URL, newUser);
            closeForm();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <div onClick={openForm} className="btn btn-outline-secondary mx-2">
                Sign up
            </div>
            <Modal centered show={showForm} onHide={closeForm}>
                <form onSubmit={submitForm}>
                    <Modal.Header>
                        <Modal.Title>Sign up</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group>
                            <Form.Label>First name</Form.Label>
                            <Form.Control type="text" required ref={firstNameRef} autoFocus/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Last name</Form.Label>
                            <Form.Control type="text" required ref={lastNameRef}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text"  required ref={usernameRef}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required ref={passwordRef}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control type="password" required ref={cmfPasswordRef}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeForm}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Sign up
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
};
