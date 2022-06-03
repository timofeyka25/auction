import React from "react";
import Countdown from "react-countdown";
import {ProgressBar} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {load} from "../store/pageSlice";

const renderer = ({days, hours, minutes, seconds, completed, props}) => {
    if (completed) {
        return null;
    }
    // if (props.item.status !== "ongoing") {
    //     return null;
    // }
    const progress =
        ((new Date() - new Date(props.item.start_datetime)) /
            (new Date(props.item.end_datetime) - new Date(props.item.start_datetime))) *
        100;
    return (<div><ProgressBar now={progress}/>
        <div className="d-flex justify-content-between mt-2">
            <h5>
                {days
                    ? days +
                    " d " +
                    hours +
                    " h " +
                    minutes +
                    " m " +
                    seconds +
                    " s"
                    : hours + " h " + minutes + " m " + seconds + " s"}
            </h5>
        </div>
    </div>);
};

export const ProductCard = ({item}) => {
    let expiredDate = item.end_datetime;
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(load({page: 1}))
    }
    return (
        <div className="col" onClick={handleClick}>
            <div className="card shadow h-100">
                <div className="card-body">
                    <Countdown
                        date={expiredDate}
                        item={item}
                        key={item.id}
                        renderer={renderer}
                    />
                    <p className="display-6">{item.title}</p>
                    <p className="card-text">{item.description}</p>
                </div>
                <div className="card-body d-flex justify-content-between align-items-lg-end">
                    {/*<div>*/}
                    {/*    <Bid auction={props.item} key={props.item.ID}/>*/}
                    {/*</div>*/}
                    <div>
                        <p className="h3">Price: ${item.current_price}</p>
                    </div>
                </div>
            </div>
        </div>

    )
        ;
};
