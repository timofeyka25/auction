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
            <div className="card shadow-lg h-100 mt-2 w-auto">
                <div className="card-body mx-3 mt-2">
                    <h4>Username: {data?.username}</h4>
                    <h4>First name: {data?.first_name}</h4>
                    {data?.last_name &&
                        <h4>Last name: {data?.last_name}</h4>
                    }
                    {data?.role_id && data.role_id === 1 ? <h4>Role: client</h4> : null}
                    {data?.role_id && data.role_id === 2 ? <h4>Role: staff</h4> : null}
                    {data?.role_id && data.role_id === 3 ? <h4>Role: admin</h4> : null}
                    <hr/>
                    <div className="justify-content-center d-flex my-2">
                        <div className="btn btn-outline-dark">Change password</div>
                    </div>
                </div>
            </div>
        </div>
    )
}