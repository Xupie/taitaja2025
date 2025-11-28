"use client";

import { useState } from "react";

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function register() {
        setLoading(true);
        setError("");

        const name = (document.querySelector("#name") as HTMLInputElement).value;
        const password = (document.querySelector("#password") as HTMLInputElement).value;

        const response = await fetch("http://localhost:8080/backend/register.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, password })
        });

        const data = await response.json();
        setLoading(false);

        if (response.ok) {
            alert("Rekisteröinti onnistui!");
            window.location.href = "/teacher/dashboard"; // example redirect
        } else {
            setError(data.error || "Virhe");
        }
    }

    return (
        <div className="p-4 text-center w-full flex flex-col items-center gap-3">
            <h1 className="text-3xl font-bold">Luo uusi opettajatili</h1>

            <input id="name" placeholder="Käyttäjänimi" className="border p-2 rounded w-64" />
            <input id="password" placeholder="Salasana" type="password" className="border p-2 rounded w-64" />

            {error && <p className="text-red-500">{error}</p>}

            <button
                type="button"
                onClick={register}
                disabled={loading}
                className="bg-black text-white px-4 py-2 rounded"
            >
                {loading ? "Odota..." : "Rekisteröidy"}
            </button>
        </div>
    );
}
