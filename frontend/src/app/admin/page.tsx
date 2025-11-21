'use client'

import { useRouter } from "next/navigation";

export default async function Admin() {
  const router = useRouter()
  const response = await fetch("/admin", {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    return router.push("/");
  }

  const data = await response.json();

  return (
    <main>
        <h1>hello world</h1>
    </main>
  );
}