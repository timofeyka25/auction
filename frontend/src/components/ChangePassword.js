import React, {useRef, useState} from "react";
import {useSelector} from "react-redux";
import {selectUser} from "../store/userSlice";
import {Alert, Button, Form, Modal} from "react-bootstrap";
import {axiosPrivate} from "../api/axios";

const CHANGE_URL = "/auth/change-pwd";

const ChangePassword = () => {
    const currentUser = useSelector(selectUser);
    const oldPwdRef = useRef();
    const newPwdRef = useRef();
    const newPwdCmfRef = useRef();
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState("");

    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);

    const submitForm = async (e) => {
        e.preventDefault();
        setError("");
        if (newPwdRef.current.value !== newPwdCmfRef.current.value) {
            return setError("Passwords does not match");
        }
        let data = {
            username: currentUser.username,
            password: oldPwdRef.current.value,
            'new-password': newPwdRef.current.value,
        };

        try {
            await axiosPrivate.post(CHANGE_URL, data);
            closeForm();
        } catch (err) {
            setError("Cannot cnahge password");
            console.log(err);
        }
    };

    return (
        <div>
            <div onClick={openForm} className="btn btn-outline-dark">
                Change password
            </div>
            <Modal centered show={showForm} onHide={closeForm}>
                <form onSubmit={submitForm}>
                    <Modal.Header>
                        <Modal.Title>Change password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group>
                            <Form.Label>Old password</Form.Label>
                            <Form.Control type="password" required ref={oldPwdRef}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>New password</Form.Label>
                            <Form.Control type="password" required ref={newPwdRef}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Confirm new password</Form.Label>
                            <Form.Control type="password" required ref={newPwdCmfRef}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeForm}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
};

export default ChangePassword;
