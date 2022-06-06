import {useSelector} from "react-redux";
import {selectUser} from "../store/userSlice";
import {useEffect, useState} from "react";
import axios from "../api/axios";
import {selectPage} from "../store/pageSlice";
import {ProductCard} from "./ProductCard";
import {EmptyCategoryCard} from "./EmptyCategoryCard";
import {AddProduct} from "./AddProduct";

const CATEGORY_URL = "/category/"

export default function Products() {
    const [data, setData] = useState([]);

    const currentUser = useSelector(selectUser);
    const currentPage = useSelector(selectPage);

    const handle = () => {
        fetchProducts();
    }

    const fetchProducts = () => {
        axios
            .get(CATEGORY_URL + currentPage?.category_id)
            .then((res) => {
                setData(res.data?.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }
    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <div>
            <div>
                <h2 className="d-flex justify-content-center">
                    Products
                </h2>
            </div>
            <div className="col my-3">
                {(currentUser?.role === 2 || currentUser?.role === 3) && (
                    <AddProduct handle={handle}/>
                )}
            </div>
            {data && (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {data.map((el) => {
                        return <ProductCard item={el} key={el.id} handle={handle}/>;
                    })}
                </div>
            )
            }
            {!data && (
                <div>
                    <EmptyCategoryCard/>
                </div>)}
        </div>
    )
}