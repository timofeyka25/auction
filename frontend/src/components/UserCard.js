import React, {useState} from "react";
import {Alert, Form, Modal} from "react-bootstrap";
import {axiosPrivate} from "../api/axios";

export default function UserCard({item, handle}) {
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState("");
    const [role, setRole] = useState(1);
    const [active, setActive] = useState(1);

    const openForm = () => {
        setRole(1);
        setActive(1);
        setShowForm(true)
    };
    const closeForm = () => setShowForm(false);

    const NEW_ADMIN_URL = "/api/new-admin";
    const NEW_STAFF_URL = "/api/new-staff";
    const NEW_CLIENT_URL = "/api/new-client";
    const handleChangeRole = async () => {
        setError("");
        let url;
        switch (Number(role)) {
            case 1:
                url = NEW_CLIENT_URL;
                break;
            case 2:
                url = NEW_STAFF_URL;
                break;
            case 3 :
                url = NEW_ADMIN_URL;
                break;
            default:
                return
        }
        try {
            await axiosPrivate.post(url, {user_id: item.id});
            await handle();
            closeForm();
        } catch (err) {
            setError("Something went wrong")
        }
    }

    const ACTIVATE_URL = "/api/activate";
    const DEACTIVATE_URL = "/api/deactivate";
    const handleChangeActive = async () => {
        setError("");
        let url;
        switch (Number(active)) {
            case 1:
                url = ACTIVATE_URL;
                break;
            case 0:
                url = DEACTIVATE_URL;
                break;
            default:
                return
        }
        try {
            await axiosPrivate.post(url, {user_id: item.id});
            await handle();
            closeForm();
        } catch (err) {
            setError("Something went wrong")
        }
    }

    const onChangeRole = (e) => {
        setRole(e.target.value);
    }
    const onChangeActive = (e) => {
        setActive(e.target.value);
    }

    return (
        <>
            <div className="card shadow-lg my-2">
                <div className="card-body d-flex justify-content-between align-items-center">
                    <div className="col">
                        <h5>
                            First name: {item.first_name}
                        </h5>
                        {item.last_name && (
                            <h5>
                                Last name: {item.last_name}
                            </h5>)}
                        <h5>
                            Username: {item.username}
                        </h5>
                    </div>
                    <div className="col-4">
                        <h5>
                            {item.is_active ? "Active" : "Not active"}
                        </h5>
                    </div>
                    <div className="col-2">
                        <div className="btn btn-outline-dark" onClick={openForm}>
                            Modify
                        </div>
                    </div>
                </div>
            </div>
            <Modal centered show={showForm} onHide={closeForm}>
                <div className="modal-header justify-content-center">
                    <h3>
                        Modify panel
                    </h3>
                </div>
                <div className="modal-body">
                    {error && <Alert variant="danger">{error}</Alert>}
                    <div className="row align-items-center">
                        <div className="col">
                            <h5>
                                Change role
                            </h5>
                        </div>
                        <div className="col">
                            <Form.Control as="select" onChange={onChangeRole}>
                                <option value={1}>Client</option>
                                <option value={2}>Staff</option>
                                <option value={3}>Admin</option>
                            </Form.Control>
                        </div>
                        <div className="col d-flex justify-content-end">
                            <div className="btn btn-outline-danger" onClick={handleChangeRole}>
                                Submit
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center mt-3">
                        <div className="col">
                            <h5>
                                Change active
                            </h5>
                        </div>
                        <div className="col">
                            <Form.Control as="select" onChange={onChangeActive}>
                                <option value={1}>Activate</option>
                                <option value={0}>Deactivate</option>
                            </Form.Control>
                        </div>
                        <div className="col d-flex justify-content-end">
                            <div className="btn btn-outline-danger" onClick={handleChangeActive}>
                                Submit
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer justify-content-center">
                    <div className="btn btn-outline-secondary" onClick={closeForm}>
                        Close
                    </div>
                </div>
            </Modal>
        </>
    )
}