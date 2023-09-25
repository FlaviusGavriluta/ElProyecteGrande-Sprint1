import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import ItemTable from "../Components/ItemTable";

import { useParams } from "react-router-dom";

const fetchItems = () => {
    return fetch(`http://localhost:8080/items`).then((res) => res.json());
};
const deleteItem = (id) => {
    return fetch(`/items/${id}`, { method: "DELETE" }).then((res) =>
        res.json()
    );
};

const ItemList = () => {
 //   const {sortBy, sortOrder} = useParams();
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState(null);
    const handleDelete = (id) => {
        deleteItem(id);

        setItems((items) => {
            return items.filter((item) => item.id !== id);
        });
    };

    useEffect(() => {
        fetchItems()
            .then(item => {
                setLoading(false);
                setItems(item);
            })

    }, []);
//sortBy, sortOrder
    if (loading) {
        return <Loading />;
    }

    return <ItemTable items={items} onDelete={handleDelete} />;
};

export default ItemList;