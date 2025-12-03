'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react"

export default function Logout() {
    const router = useRouter();

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout.php`, {
            credentials: 'include',
        });
        cookieStore.delete("PHPSESSID")
        router.push("/");
        return;
    }, [router.push])

    return (
        <p>Logging out</p>
    )
}