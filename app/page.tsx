import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col md:flex-row md:pt-10 md:my-36">
      <div className="flex flex-col justify-center items-center h-80 md:block">
        <h1 className="font-bold text-5xl text-zinc-800 py-3 dark:text-zinc-100 md:text-7xl">
          DOCVAULT
        </h1>
        <p className="text-md text-center text-zinc-700 py-3 mx-4 mb-10 dark:text-zinc-300 md:text-lg md:mx-0">
          Your secure haven for storing all documents and files online.
        </p>

        <Link
          href="/dashboard"
          className="flex justify-center items-center text-lg p-3 px-10  bg-blue-700 rounded-sm text-zinc-100 md:w-60"
        >
          Try it for free
          <ArrowRight className="ml-2"></ArrowRight>
        </Link>
      </div>

      <div>
        <Image
          src="/HomeImage.png"
          width={500}
          height={500}
          alt="Website Logo"
          className="w-96 mb-10 md:px-10"
        />
      </div>
    </div>
  );
}
