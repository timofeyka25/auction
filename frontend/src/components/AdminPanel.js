import {useState} from "react";
import Clients from "./Users";

export default function AdminPanel() {
    const [page, setPage] = useState(1)
    const handlePage = param => (e) => {
        e.preventDefault();
        setPage(param);
    }
    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="btn btn-outline-dark mx-3"
                     onClick={handlePage(1)}>
                    Clients
                </div>
                <div className="btn btn-outline-dark mx-3"
                     onClick={handlePage(2)}>
                    Staff
                </div>
                <div className="btn btn-outline-dark mx-3"
                     onClick={handlePage(3)}>
                    Admins
                </div>
            </div>
            {page === 1 && <Clients mode={1}/>}
            {page === 2 && <Clients mode={2}/>}
            {page === 3 && <Clients mode={3}/>}
        </>
    )
}