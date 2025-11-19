import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="justify-around md:mx-50 grid grid-cols-2">
        <div>
          <div>
            <h1>Taitaja</h1>
            <h1>Tietotesti</h1>
          </div>
          <p>Haluatko testata tietosi? Se on nyt helppoa! Valitse opettaja ja aihealue, ja aloita heti!</p>
          <button className="btn" type="button">Pelaa nyt</button>
        </div>
        <div>
          <Image
            src={`img1.jpg`}
            alt={"img"}
            width={0}
            height={0}
            style={imageStyle}
            loading={"lazy"}
          />
        </div>
      </div>
    </main>
  );
}

const imageStyle = {
  height: 'auto',
  width: '100%',
}