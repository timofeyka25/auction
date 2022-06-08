import React from "react";

export default function BoughtProductCard({item}) {
    return (
        <>
            <div className="card shadow-lg my-2">
                <div className="card-body d-flex justify-content-around align-items-center">
                    <div className="col-3">
                        {item.title}
                    </div>
                    <div className="col-3">
                        Price: ${item.current_price}
                    </div>
                    <div className="col-3 mx-2">
                        Start time: {new Date(item.start_datetime).toUTCString()}
                    </div>
                    <div className="col-3 mx-2">
                        End time: {new Date(item.end_datetime).toUTCString()}
                    </div>
                </div>
            </div>
        </>
    )
}