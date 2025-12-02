'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Admin() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<{ id: string; category_name: string, question_count: number }[]>([]);

  useEffect(() => {
    async function checkAuth() {
      const response = await fetch("http://localhost:8080/backend/admin.php", {
        method: 'GET',
        credentials: 'include',
      });

      // redirect to login if unauthorized
      if (!response.ok) {
        router.push("/login");
        return;
      }
      setLoading(false);
    }
    
    async function getCategories() {
      const response = await fetch("http://localhost:8080/backend/game.php?action=get_categories&me=1", {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        alert("Virhe kategorioiden hakemisessa");
        return; 
      }

      setCategories(await response.json());
    }

    checkAuth();
    getCategories();
  }, [router]);

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h1>Admin Panel</h1>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            <Link href={`/admin/${category.id}`}>
              {category.category_name} - Questions: {category.question_count}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}