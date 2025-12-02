"use client"

import { useParams } from "next/navigation";
import EditCategory from "./editCategory";

export default function CategoryPage() {

    const params = useParams();
    const idParam = params?.id;

    const id = Array.isArray(idParam) ? idParam[0] : idParam;

    if (!id) return <p>No category ID</p>;

    return <EditCategory id={id} />
}