import React, {useEffect, useState} from "react";
import {axiosPrivate} from "../api/axios";
import UserCard from "./UserCard";

const CLIENTS_URL = "/api/clients"
const STAFF_URL = "/api/staff"
const ADMINS_URL = "/api/admins"
export default function Users({mode}) {
    const [data, setData] = useState([]);
    const fetchUsers = () => {
        let url;
        switch (mode) {
            case 1:
                url = CLIENTS_URL;
                break;
            case 2:
                url = STAFF_URL;
                break;
            case 3 :
                url = ADMINS_URL;
                break;
            default:
                return
        }
        axiosPrivate.get(url)
            .then(r => {
                setData(r.data?.data)
            })
            .catch(err => console.log(err));
    }
    useEffect(() => {
        fetchUsers();
    }, [])

    const handle = () => {
        fetchUsers();
    }

    return (
        <>
            <div className="d-flex justify-content-center mt-3">
                {data && (<div className="row w-75">
                    {data.map((el) => {
                        return <UserCard item={el} key={el.id} handle={handle}/>
                    })}
                </div>)}
            </div>
        </>
    )
}