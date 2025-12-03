'use client'

import Button_Primary, { Button_Delete, Button_Edit } from "@/components/buttons";
import CreateCategory from "@/components/category/createCategory";
import UpdateCategory from "@/components/category/updateCategory";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { env } from "process";
import { useEffect, useState } from "react";

export default function Admin() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<{ id: string; category_name: string, question_count: number }[]>([]);
  const [newCategoryVisible, setNewCategoryVisible] = useState(false);
  const [updateCategoryVisible, setUpdateCategoryVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const onClickNewCategory = () => {
    setNewCategoryVisible(!newCategoryVisible);
  }

  const onClickUpdateCategory = () => {
    setUpdateCategoryVisible(!updateCategoryVisible);
  }

  useEffect(() => {
    async function checkAuth() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin.php`, {
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/game.php?action=get_categories&me=1`, {
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

  async function createNewCategory() {
    const category_name = (document.querySelector("input[name=category_name]") as HTMLInputElement).value;
    const category_description = (document.querySelector("input[name=category_description]") as HTMLInputElement).value;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin.php?action=add_category`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          category: category_name,
          description: category_description,
        },
      ),
    });
    if (response.ok) {
      const data = await response.json();
      setNewCategoryVisible(false);
    }
    else {
      alert("Virhe categorian luomisessa");
    }
  }

  async function updateCategory() {
    const category_name = (document.querySelector("input[name=category_name]") as HTMLInputElement).value;
    const category_description = (document.querySelector("input[name=category_description]") as HTMLInputElement).value;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin.php?action=update_category`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          category_name: category_name,
          category_description: category_description,
          category_id: selectedCategory,
        },
      ),
    });
    if (response.ok) {
      const data = await response.json();
      setUpdateCategoryVisible(false);
    }
    else {
      alert("Virhe kategorian päivittämisessä");
    }
  }

  async function deleteCategory(category_id: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin.php?action=delete_category`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          category_id: category_id,
        },
      ),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }
    else {
      alert("Virhe kategorian poistamisessa");
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-xl md:shadow-lg flex flex-col gap-6 mt-4">
      <h1 className="text-3xl text-center font-bold mb-2">Kategoriat</h1>

      <ul>
        {categories.map(category => (
          <li className="bg-secondary rounded-xl p-4 mb-4" key={category.id}>
            <Link href={`/admin/${category.id}`}>
              <p className="text-3xl">{category.category_name}</p>
            </Link>
            <p className="text-md">Kysymyksiä: {category.question_count}</p>
            <div className="flex ms-auto gap-4">
              <Button_Edit size="2.5rem" onClick={() => {
                setSelectedCategory(category.id);
                onClickUpdateCategory();
              }} />
              <Button_Delete size="2.5rem" onClick={() => {
                deleteCategory(category.id);
              }} />
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-start">
        <Button_Primary
          height="3rem"
          text="Uusi kategoria"
          width="10rem"
          onClick={onClickNewCategory}
        />
      </div>
      {newCategoryVisible && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <CreateCategory createCategory={createNewCategory} cancel={() => onClickNewCategory()} />
        </div>
      )}
      {updateCategoryVisible && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <UpdateCategory updateCategory={updateCategory} cancel={() => onClickUpdateCategory()} />
        </div>
      )}
    </div>
  );
}