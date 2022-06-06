import {useEffect, useState} from "react";
import {axiosPrivate} from "../api/axios";
import BidCard from "./BidCard";

const BID_URL = "/api/bid/"
export default function UserBids() {
    const [data, setData] = useState([]);
    const fetchBids =  () => {
        axiosPrivate.get(BID_URL)
            .then(r => {
                setData(r.data?.data)
            })
            .catch(err => console.log(err));
    }
    useEffect(() => {
        fetchBids();
    }, [])

    return (
        <div className="d-flex col justify-content-center mt-3">
            {data && (
                <div className="row  w-50">
                    {data.map((el) => {
                        return <BidCard item={el} key={el.id}/>
                    })}
                </div>
            )
            }
        </div>
    )
}