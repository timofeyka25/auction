import {useDispatch} from "react-redux";
import {load} from "../store/pageSlice";

export default function CategoryCard({item}) {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(load({
            page: 2,
            category_id: item.id,
        }))
    }
    return (<div className="col">
        <div className="card shadow h-100">
            <div className="card-body" onClick={handleClick}>
                <h3 align="center">{item.category}</h3>
            </div>
        </div>
    </div>)
}