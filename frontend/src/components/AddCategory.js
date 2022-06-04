import {useRef, useState} from "react";
import {Alert, Button, Col, Form, Modal} from "react-bootstrap";
import {axiosPrivate} from "../api/axios";


const ADD_URL = "/api/category/";

export const AddCategory = ({handle}) => {
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState("");

    const category = useRef();
    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);

    const submitForm = async (e) => {
        e.preventDefault();
        setError("");
        let newCategory = category.current.value.toString()
        newCategory = newCategory.trim().replace(/  +/g, ' ')
        if (!newCategory.length)
            setError("Incorrect value")
        else {
            try {
                await axiosPrivate.post(ADD_URL, {category: newCategory})
                handle();
                closeForm();
            } catch (err) {
                setError("Cannot add this category")
            }
        }
    }

    return (
        <>
            <div className="col d-flex justify-content-center my-3">
                <div onClick={openForm} className="btn btn-outline-secondary mx-2">
                    + Category
                </div>
            </div>
            <Modal centered show={showForm}>
                <form onSubmit={submitForm}>
                    <Modal.Header>
                        <Modal.Title>Add category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Col>
                            <Form.Group>
                                <Form.Label>Category name</Form.Label>
                                <Form.Control type="text" required ref={category} autoFocus/>
                            </Form.Group>
                        </Col>
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
        </>
    )
}