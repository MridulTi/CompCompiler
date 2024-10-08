import { AuthNav } from "@components/Nav";
import { Button } from "@components/ui/button";
import HyperText from "@components/ui/hyper-text";
import ShimmerButton from "@components/ui/shimmer-button";
import Image from "next/image";
import Link from "next/link";
import { LuBinary } from "react-icons/lu";

export default function Home() {
  return (
    <>
      <section className="w-full bg-gradient-to-b from-black to-green-500 h-screen grid place-items-center">
        <div className="grid place-items-center w-full text-gray-100">
          <HyperText className="text-center font-extrabold font-sans text-7xl  tracking-tight" text="COMPETE  WITH  YOUR" />
          <HyperText className="text-center font-extrabold text-5xl font-serif tracking-tight text-green-800" text="  OWN  KIND." />
          <h2 className="text-lg text-gray-400 w-1/2 mt-6 font-semibold text-center ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, dolorum molestias? Reprehenderit ducimus officia incidunt quo maxime, sunt atque! Assumenda excepturi corrupti mollitia doloremque nisi? Iste quasi incidunt perspiciatis ea?</h2>
          <Link href="/code/authentication"><ShimmerButton  className="px-10 py-4 font-bold text-lg mt-6 rounded-full flex gap-2 hover:text-white hover:bg-green-400">Let's Compete <LuBinary className="text-4xl" /></ShimmerButton></Link>
        </div>
      </section>
    </>
  );
}
