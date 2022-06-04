import React from "react";
import {useDispatch} from "react-redux";
import {load} from "../store/pageSlice";


export const EmptyCategoryCard = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(load({page: -1}))
    }
    return (
        <div className="col d-flex justify-content-center my-3 ">
            <div className="card shadow h-100 ">
                <div className="card-body ">
                    <h3 className="mb-3">There are currently no products in this category</h3>
                    <div className="d-flex justify-content-center">
                        <div onClick={handleClick} className="btn btn-outline-secondary">
                            Go back
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
