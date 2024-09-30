import Image from "next/image";
import { LuBinary } from "react-icons/lu";

export default function Home() {
  return (
    <section className="w-full bg-gradient-to-b from-cyan-600 to-cyan-200 h-screen flex-center flex-col">
      <div className="py-64 grid place-items-center w-full text-gray-100">
        <h1 className="text-center font-extrabold text-8xl w-4/6  tracking-tight">COMPETE WITH YOUR OWN KIND.</h1>
        <h2 className="text-md w-1/2 mt-6 font-bold text-center ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, dolorum molestias? Reprehenderit ducimus officia incidunt quo maxime, sunt atque! Assumenda excepturi corrupti mollitia doloremque nisi? Iste quasi incidunt perspiciatis ea?</h2> 
        <button className="px-10 py-2 bg-white text-black font-bold text-md mt-6 rounded-full flex gap-2 hover:text-white hover:bg-black">Let's Compete <LuBinary className="text-2xl"/></button>
      </div>
    </section>
  );
}
