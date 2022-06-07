import React, {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {axiosPrivate} from "../api/axios";

const GET_URL = "/api/product/"

export default function BidCard({item}) {
    const [showInfo, setShowInfo] = useState(false);
    const [data, setData] = useState([])

    const openInfo = () => setShowInfo(true);
    const closeInfo = () => setShowInfo(false);

    const fetchProduct = () => {
        axiosPrivate.get(GET_URL + item.product_id)
            .then(r => {
                setData(r.data)
            })
            .catch(err => console.log(err))

    }
    useEffect(() => {
        fetchProduct();
    }, [])

    return (
        <>
            <div className="card shadow-lg my-2">
                <div className="card-body d-flex justify-content-around align-items-center">
                    <div className="col-3">
                        Price: ${item.price}
                    </div>
                    <div className="col-auto btn btn-outline-dark" onClick={openInfo}>
                        Product
                    </div>
                    <div className="col-4">
                        Time: {new Date(item.bid_datetime).toUTCString()}
                    </div>
                </div>
            </div>
            <Modal centered show={showInfo} onHide={closeInfo}>
                <Modal.Body>
                    <h2 className="d-flex justify-content-center">{data && data.title}</h2>
                    <h5>Description: {data && data.description}</h5>
                    <h5>Price: ${data && data.current_price}</h5>
                    <h5>Started at: {data && new Date(data.start_datetime).toUTCString()}</h5>
                    <h5>Ended at: {data && new Date(data.end_datetime).toUTCString()}</h5>
                    <h5>Status: {data && data.status}</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={closeInfo}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}