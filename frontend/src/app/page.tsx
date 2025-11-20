import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="md:max-w-3/5 mx-auto my-4">
      <div className="grid grid-cols-2 my-6 items-center">
        <div className="mx-4">
          <h1 className="text-6xl">Taitaja</h1>
          <h1 className="text-6xl">Tietotesti</h1>
          <p className="text-lg">Haluatko testata tietosi? Se on nyt helppoa! Valitse opettaja ja aihealue, ja aloita heti!</p>
          <button className="btn btn-primary" type="button"><Link href='/game'>Pelaa nyt</Link></button>
        </div>
        <Image
          className="shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]"
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
          className="shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]"
          src={`img2.jpg`}
          alt={"img"}
          width={0}
          height={0}
          style={imageStyle}
          loading={"lazy"}
        />
        <div className="mx-4">
          <h1 className="text-3xl">Miten pelataan?</h1>
          <ul className="list-decimal mx-4">
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>Suspendisse tincidunt ornare iaculis.</li>
            <li>Cras turpis neque, aliquet ut justo et, aliquam ornare turpis.</li>
            <li>Pellentesque sed magna fringilla, feugiat sapien in, ultrices diam. Maecenas ullamcorper odio eget nulla auctor, eget pellentesque nibh fermentum.​</li>
          </ul>
        </div>

      </div>
    </main>
  );
}

const imageStyle = {
  height: 'auto',
  width: '90%',

}