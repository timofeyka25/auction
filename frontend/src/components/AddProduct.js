import {Alert, Button, Col, Form, Modal, Row} from "react-bootstrap";
import React, {useRef, useState} from "react";
import {axiosPrivate} from "../api/axios";
import {useSelector} from "react-redux";
import {selectPage} from "../store/pageSlice";

const ADD_URL = "/api/product/";

export const AddProduct = ({handle}) => {
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState("");
    const currentPage = useSelector(selectPage);

    const title = useRef();
    const description = useRef();
    const price = useRef();
    const endDatetime = useRef();
    const minBidValue = useRef();

    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);

    const submitForm = async (e) => {
        e.preventDefault();
        setError("");

        let newAuction = {
            title: title.current.value.trim().replace(/  +/g, ' '),
            description: description.current.value.trim().replace(/  +/g, ' '),
            category_id: currentPage?.category_id,
            current_price: Number(price.current.value),
            end_datetime: new Date(endDatetime.current.value),
            min_bid_value: Number(minBidValue.current.value),
        };
        try {
            await axiosPrivate.post(ADD_URL, newAuction);
            handle();
        } catch (err) {
            console.log(err)
            // setError(err);
        }
        closeForm();
    };
    let d = new Date();
    return (<>
        <div className="col d-flex justify-content-center my-3">
            <div onClick={openForm} className="btn btn-outline-secondary mx-2">
                + Product
            </div>
        </div>
        <Modal centered show={showForm} onHide={closeForm}>
            <form onSubmit={submitForm}>
                <Modal.Header>
                    <Modal.Title>Create new product lot</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Col>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" required ref={title} autoFocus/>
                        </Form.Group>
                    </Col>
                    <Col className="my-3">
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                // min={50}
                                rows={2}
                                required
                                ref={description}
                            />
                        </Form.Group>
                    </Col>
                    <Row className="mt-3">
                        <Col>
                            <Form.Group>
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    required
                                    ref={price}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>End datetime</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    timeformat="YYYY-MM-DD HH:mm"
                                    defaultValue={d}
                                    required
                                    ref={endDatetime}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Min bid value</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    required
                                    ref={minBidValue}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeForm}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        Create
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    </>);
};
