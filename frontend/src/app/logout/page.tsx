'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react"

export default function Logout() {
    const router = useRouter();

    useEffect(() => {
        fetch("http://localhost:8080/backend/logout.php", {
            credentials: 'include',
        });
        cookieStore.delete("PHPSESSID")
        router.push("/");
        return;
    }, [])

    return (
        <p>Logging out</p>
    )
}