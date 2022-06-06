import React from "react";
import Countdown from "react-countdown";
import {ProgressBar} from "react-bootstrap";
import Bid from "./Bid";
import {useSelector} from "react-redux";
import {selectUser} from "../store/userSlice";
import Cancel from "./Cancel";

const renderer = ({days, hours, minutes, seconds, completed, props}) => {
    if (completed) {
        return (
            <div>
                <ProgressBar now={100} className="mt-1"/>
                <div className="d-flex justify-content-center ">
                    <h5>Completed</h5>
                </div>
            </div>);
    }
    if (props.item.status === "cancelled") {
        return (
            <div>
                <ProgressBar now={100} className="mt-1 disabled"/>
                <div className="d-flex justify-content-center ">
                    <h5>Cancelled</h5>
                </div>
            </div>);
    }
    const progress =
        ((new Date() - new Date(props.item.start_datetime)) /
            (new Date(props.item.end_datetime) - new Date(props.item.start_datetime))) *
        100;
    return (
        <div>
            <ProgressBar now={progress} className="mt-1"/>
            <div className="d-flex justify-content-center">
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

export const ProductCard = ({item, handle}) => {
    let expiredDate = item.end_datetime;
    const currentUser = useSelector(selectUser);

    return (
        <>
            {((currentUser?.role !== 2 && currentUser?.role !== 3) && item.status !== "ongoing") ? null :
                (<div className="col">
                    <div className="card shadow h-100">
                        <div className="card-header">
                            <Countdown
                                date={expiredDate}
                                item={item}
                                key={item.id}
                                renderer={renderer}
                            />
                        </div>
                        <div className="card-body">
                            <p className="display-6">{item.title}</p>
                            <p className="card-text">{item.description}</p>
                        </div>
                        <div className="card-body d-flex justify-content-between align-items-lg-end">
                            <div>
                                <Bid item={item} key={item.id} handle={handle}/>
                            </div>
                            {(currentUser?.role === 2 || currentUser?.role === 3) &&
                                (<div>
                                    <Cancel item={item} key={item.id} handle={handle}/>
                                </div>)}
                            <div>
                                <p className="h3">Price: ${item.current_price}</p>
                            </div>
                        </div>
                    </div>
                </div>)}
        </>
    );
};
