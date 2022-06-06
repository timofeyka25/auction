import {Alert, Button, Col, Form, Modal, Row} from "react-bootstrap";
import React, {useRef, useState} from "react";
import {useSelector} from "react-redux";
import {axiosPrivate} from "../api/axios";
import {selectUser} from "../store/userSlice";

const BID_URL = "/api/bid/";

const Bid = ({item, handle}) => {
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState("");
    const [price, setPrice] = useState(item.min_bid_value);
    const priceRef = useRef();
    const currentUser = useSelector(selectUser);

    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);

    const submitForm = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await axiosPrivate.post(BID_URL, {
                price: Number(price),
                product_id: item.id,
            });
            handle();
            closeForm();
        } catch (err) {
            setError("Cannot make bid");
            console.log(err);
        }
    };

    return (
        <>
            {item.status !== "ongoing" ?
                (
                    <div onClick={openForm} className="btn btn-outline-secondary disabled">
                        Bid
                    </div>
                ) :
                (
                    <div onClick={openForm} className="btn btn-outline-secondary">
                        Bid
                    </div>
                )}
            {currentUser ? (
                <Modal centered show={showForm} onHide={closeForm}>
                    <form onSubmit={submitForm}>
                        <Modal.Header>
                            <Modal.Title>Bid {item.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Row className="mb-3">
                                <Col className="d-flex justify-content-center">
                                    <Form.Label>Price: ${price}</Form.Label>
                                </Col>
                                <Col className="d-flex justify-content-center">
                                    <Form.Label>Min: ${item.min_bid_value}</Form.Label>
                                </Col>
                                <Form.Group>
                                    <Form.Control
                                        value={Number(price)}
                                        min={item.min_bid_value}
                                        onChange={(changeEvent) =>
                                            setPrice(changeEvent.target.value)
                                        }
                                        type="number"
                                        step="0.01"
                                        required
                                        ref={priceRef}
                                    />
                                </Form.Group>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={closeForm}>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit">
                                Bid
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            ) : (
                <Modal centered show={showForm} onHide={closeForm}>
                    <Modal.Body>
                        <Modal.Title>Please login first</Modal.Title>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={closeForm}>
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};

export default Bid;
