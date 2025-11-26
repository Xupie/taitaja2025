'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Admin() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const response = await fetch("/api/admin", {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        router.push("/");
        return;
      }
      setLoading(false);
    }
    
    checkAuth();
  }, [router]);

  if (loading) return <p>Loading...</p>

  return (
    <main>
        <h1>hello world</h1>
    </main>
  );
}