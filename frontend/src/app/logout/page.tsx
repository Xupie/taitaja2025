'use client'
import { useRouter } from "next/navigation";
import { env } from "process";
import { useEffect } from "react"

export default function Logout() {
    const router = useRouter();

    useEffect(() => {
        fetch(`${env.API_URL}/logout.php`, {
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