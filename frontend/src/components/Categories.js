import CategoryCard from "./CategoryCard";
import {useSelector} from "react-redux";
import {selectUser} from "../store/userSlice";

export default function Categories({data}) {
    const currentUser = useSelector(selectUser);
    return (
        <div>
            <div className="col d-flex justify-content-between my-3">
                {(currentUser?.role === 2 || currentUser?.role === 3) && (
                    <div className="col d-flex justify-content-center my-3">
                        <div className="btn btn-outline-secondary mx-2">
                            + Category
                        </div>
                    </div>
                )}
            </div>
            {data && (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {data.map((el) => {
                        return <CategoryCard item={el} key={el.id}/>;
                    })}
                </div>
            )
            }
        </div>
    )
}