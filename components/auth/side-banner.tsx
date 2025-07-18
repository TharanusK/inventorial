import Image from "next/image";

export function SideBanner() {
  return (
    <div className="flex flex-col  p-14 text-center">
      <div className="flex  gap-6  items-center flex-wrap justify-center">
        <Image
          src="/Icons/inventorial-icon.svg"
          alt="logo"
          width={90}
          height={90}
        />
        <p className=" text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono">
          Inventorial
        </p>
      </div>

      <div className="flex flex-col gap-4 mt-16">
        <p className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono">
          Access Your
        </p>
        <p className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono">
          Inventory.
        </p>
        <p className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono">
          Anytime.
        </p>
        <p className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono">
          Anywhere.
        </p>
      </div>
    </div>
  );
}
