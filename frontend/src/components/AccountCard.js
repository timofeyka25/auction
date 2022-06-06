import React, {useEffect, useState} from "react";
import {axiosPrivate} from "../api/axios";

const GET_URL = "/api/account/"
export default function AccountCard() {
    const [data, setData] = useState([])
    useEffect(() => {
        axiosPrivate.get(GET_URL)
            .then(r => setData(r?.data.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="col d-flex justify-content-center mt-2">
            <div className="card shadow-lg h-100 mt-2">
                <div className="card-body display-6 mx-2 mt-2">
                    <div>Username: {data?.username}</div>
                    <div>First name: {data?.first_name}</div>
                    {data?.last_name &&
                        <div>Last name: {data?.last_name}</div>
                    }
                    {data?.role_id && data.role_id === 1 ? <div>Role: client</div> : null}
                    {data?.role_id && data.role_id === 2 ? <div>Role: staff</div> : null}
                    {data?.role_id && data.role_id === 3 ? <div>Role: admin</div> : null}
                </div>
                <div className="card-body justify-content-center d-flex">
                    <div className="btn btn-outline-dark">Change password</div>
                </div>
            </div>
        </div>
    )
}