import {useEffect, useState} from "react";
import {axiosPrivate} from "../api/axios";
import BoughtProductCard from "./BoughtProductCard";
import React from "react";

const GET_URL = "/api/product/bought/"
export default function BoughtProducts() {
    const [data, setData] = useState([]);
    const fetchProducts = () => {
        axiosPrivate.get(GET_URL)
            .then(r => {
                setData(r.data?.data)
            })
            .catch(err => console.log(err));
    }
    useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <div className="d-flex col justify-content-center mt-3">
            {data && (
                <div className="row w-75">
                    {data.map((el) => {
                        return <BoughtProductCard item={el} key={el.id}/>
                    })}
                </div>)
            }
            {!data && (<div className="card shadow-lg my-2">
                <div className="card-body d-flex justify-content-around align-items-center">
                        You have not bought any product.
                </div>
            </div>)}
        </div>
    )
}