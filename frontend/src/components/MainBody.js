import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import axios from "../api/axios";
import {selectPage} from "../store/pageSlice";
import Categories from "./Categories";
import Products from "./Products";

const CATEGORY_URL = "/category/";

export default function MainBody() {
    const currentPage = useSelector(selectPage)

    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get(CATEGORY_URL)
            .then((res) => {
                console.log(res.data?.data);
                setData(res.data?.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (<div className="py-5">
        <div className="container">
            {(currentPage === null || currentPage?.page === 1) && <Categories data={data}/>}
            {currentPage?.page === 2 && <Products/>}
        </div>
    </div>)
}