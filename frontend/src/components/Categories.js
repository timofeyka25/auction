import CategoryCard from "./CategoryCard";
import {useSelector} from "react-redux";
import {selectUser} from "../store/userSlice";
import {AddCategory} from "./AddCategory";
import {useEffect, useState} from "react";
import axios, {axiosPrivate} from "../api/axios";

const CATEGORY_URL = "/category/";
const ALL_CATEGORY_URL = "/api/category/";
export default function Categories() {
    const currentUser = useSelector(selectUser);

    const [data, setData] = useState([]);

    const handle = () => {
        fetchAllCategories();
    }

    const fetchAllCategories = () => {
        axiosPrivate
            .get(ALL_CATEGORY_URL)
            .then((res) => {
                setData(res.data?.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    const fetchCategories = () => {
        axios
            .get(CATEGORY_URL)
            .then((res) => {
                setData(res.data?.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    useEffect(() => {
        if (currentUser?.role === 2 || currentUser?.role === 3)
            fetchAllCategories();
        else fetchCategories();
    }, []);

    return (
        <div>
            <div>
                <h2 className="d-flex justify-content-center">
                    Categories
                </h2>
            </div>
            {!data && (<div className="d-flex justify-content-center p-3">
                <h2>
                    There are no categories available right now, check back later
                </h2>
            </div>)}
            <div className="col my-3">
                {(currentUser?.role === 2 || currentUser?.role === 3) && (
                    <AddCategory handle={handle}/>
                )}
            </div>
            {data && (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {data.map((el) => {
                        return <CategoryCard item={el} key={el.id}/>;
                    })}
                </div>
            )
            }
        </div>
    )
}