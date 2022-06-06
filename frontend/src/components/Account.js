import {useState} from "react";
import AccountCard from "./AccountCard";

export default function Account() {
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
                    Account
                </div>
                <div className="btn btn-outline-dark mx-3"
                     onClick={handlePage(2)}>
                    My bids
                </div>
                <div className="btn btn-outline-dark mx-3"
                     onClick={handlePage(3)}>
                    Bought products
                </div>
            </div>
            {page === 1 && (<AccountCard/>)}
            {page === 2 && (<h1>My bids</h1>)}
            {page === 3 && (<h1>Bought products</h1>)}
        </>
    )
}