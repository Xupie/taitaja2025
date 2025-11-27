'use client'

import Image from "next/image";
import Button_Primary from "./components/buttons";
import { useRouter } from "next/navigation";
import Card from "./components/card";

export default function Home() {
  const router = useRouter();
  return (
    <div className="md:max-w-3/5 mx-auto">
      <div className="grid grid-cols-2 my-10 items-center">
        <div className="">
          <h1 className="text-6xl">Taitaja<br />Tietotesti</h1>
          <p className="text-xl">Haluatko testata tietosi? Se on nyt helppoa! Valitse opettaja ja aihealue, ja aloita heti!</p>
          <div className="my-4">
            <Button_Primary height="auto" width="10rem" text="Pelaa nyt" onClick={() => router.push("/game")} />
          </div>
        </div>
        <Image
          className="shadow-[0px_4px_16px_rgba(17,17,26,0.1),0px_8px_24px_rgba(17,17,26,0.1),0px_16px_56px_rgba(17,17,26,0.1)]"
          src={`img1.jpg`}
          alt={"img"}
          width={0}
          height={0}
          style={imageStyle}
          loading={"lazy"}
        />
      </div>
      <div className="grid grid-cols-2 my-6 items-center">
        <Image
          className="shadow-[0px_4px_16px_rgba(17,17,26,0.1),0px_8px_24px_rgba(17,17,26,0.1),0px_16px_56px_rgba(17,17,26,0.1)]"
          src={`img2.jpg`}
          alt={"img"}
          width={0}
          height={0}
          style={imageStyle}
          loading={"lazy"}
        />
        <div className="mx-4">
          <Card bgClass="bg-secondary" border={false}>
            <h1 className="text-3xl">Miten pelataan?</h1>
            <ul className="list-decimal mx-4 text-lg">
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li>Suspendisse tincidunt ornare iaculis.</li>
              <li>Cras turpis neque, aliquet ut justo et, aliquam ornare turpis.</li>
              <li>Pellentesque sed magna fringilla, feugiat sapien in, ultrices diam. Maecenas ullamcorper odio eget nulla auctor, eget pellentesque nibh fermentum.​</li>
            </ul>
          </Card>

        </div>

      </div>
    </div>

  );
}

const imageStyle = {
  height: 'auto',
  width: '90%',
}