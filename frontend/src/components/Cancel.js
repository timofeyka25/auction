import {Alert, Button, Modal, Row} from "react-bootstrap";
import React, {useState} from "react";
import {axiosPrivate} from "../api/axios";

const CANCEL_URL = "/api/product/";

const Cancel = ({item, handle}) => {
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState("");

    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);

    const submitForm = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await axiosPrivate.put(CANCEL_URL + item.id, {
                status: "cancelled",
            });
            handle();
            closeForm();
        } catch (err) {
            setError("Cannot cancel");
            console.log(err);
        }
    };

    return (
        <>
            {item.status !== "ongoing" ?
                (
                    <div onClick={openForm} className="btn btn-outline-secondary disabled">
                        Cancel
                    </div>
                ) :
                (
                    <div onClick={openForm} className="btn btn-outline-secondary">
                        Cancel
                    </div>
                )}
            <Modal centered show={showForm} onHide={closeForm}>
                <form onSubmit={submitForm}>
                    <Modal.Header>
                        <Modal.Title>Cancel {item.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Row className="mb-3 d-flex justify-content-center">
                            Are you sure you want to cancel this auction?
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeForm}>
                            No
                        </Button>
                        <Button variant="primary" type="submit">
                            Yes
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
};

export default Cancel;
