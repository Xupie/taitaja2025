"use client"

import Button_Primary from "@/components/buttons";
import Card from "@/components/card";
import InputWithIcon from "@/components/inputWithIcon";
import { useState } from "react";

export default function Login() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function sendLogin() {
    setLoading(true);

    const email = (document.querySelector("input[name=email]") as HTMLInputElement).value;
    const password = (document.querySelector("input[name=password]") as HTMLInputElement).value;

    if (!email || !password) {
      setError(true);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(true);
        console.log("Virhe kirjautumissa: " + data.message);
      } else {
        alert("Kirjautuminen onnistui!");
      }

    } catch (err) {
      setError(true);
    }

    setLoading(false);
  }

  return (
    <main className="max-w-2/5 mx-auto my-8">

      <Card>
        <div className="w-4/5 mx-auto">
          <h1 className="text-background text-center text-3xl font-bold">Kirjaudu sisään</h1>

          <div className="flex flex-col gap-6 pt-5 pb-10">
            <div className="text-background flex flex-col">
              <label htmlFor="email">Sähköposti</label>
              <InputWithIcon icon="/icons/email/email.svg" name="email" placeholder="name@email.com" type="text"/>
            </div>

            <div className="text-background flex flex-col">
              <label htmlFor="password">Salasana</label>
              <InputWithIcon icon="/icons/password/password.svg" name="password" placeholder="password123" type="text"/>
              <a className="text-right text-sm" href="/reset">Unohditko salasanan?</a>
            </div>
          </div>

          {error 
          ? 
          <div className="bg-error-bg">
            <p>Virhe sähköpostissa tai salasanassa</p>
          </div> : ""}

          <Button_Primary onClick={sendLogin} disabled={loading} text={loading ? "Kirjaudutaan..." : "Kirjaudu"} height={"10"} width={"full"} />
        </div>
      </Card>

    </main>
  );
}