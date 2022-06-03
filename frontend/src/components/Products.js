import {useSelector} from "react-redux";
import {selectUser} from "../store/userSlice";
import {useEffect, useState} from "react";
import axios from "../api/axios";
import {selectPage} from "../store/pageSlice";
import {ProductCard} from "./ProductCard";

const CATEGORY_URL = "/category/"

export default function Products() {
    const [data, setData] = useState([]);

    const currentUser = useSelector(selectUser);
    const currentPage = useSelector(selectPage);

    useEffect(() => {
        axios
            .get(CATEGORY_URL + currentPage?.category_id)
            .then((res) => {
                console.log(res.data?.data);
                setData(res.data?.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);
    return (
        <div>
            <div className="col d-flex justify-content-between my-3">
                {(currentUser?.role === 2 || currentUser?.role === 3) && (
                    <div className="col d-flex justify-content-center my-3">
                        <div className="btn btn-outline-secondary mx-2">
                            + Product
                        </div>
                    </div>
                )}
            </div>
            {data && (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {data.map((el) => {
                        return <ProductCard item={el} key={el.id}/>;
                    })}
                </div>
            )
            }
        </div>
    )
}