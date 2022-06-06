import React from "react";
import {useSelector} from "react-redux";
import {selectPage} from "../store/pageSlice";
import Categories from "./Categories";
import Products from "./Products";
import Account from "./Account"

export default function MainBody() {
    const currentPage = useSelector(selectPage)

    return (
        <div className="py-5">
            <div className="container">
                {(currentPage === null) && <Categories/>}
                {(currentPage?.page === 1) && <Categories/>}
                {(currentPage?.page === -1) && <Categories/>}
                {/*{(currentPage?.page === 0) && <Categories/>}*/}
                {currentPage?.page === 2 && <Products/>}
                {currentPage?.page === 3 && <Account/>}
            </div>
        </div>)
}