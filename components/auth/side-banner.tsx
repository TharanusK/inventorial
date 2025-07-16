import Image from "next/image";
import { Label } from "@/components/ui/label";

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
        <Label className=" text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          Inventorial
        </Label>
      </div>

      <div className="flex flex-col gap-4 mt-16">
        <Label className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          Access Your
        </Label>
        <Label className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          Inventory.
        </Label>
        <Label className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          Anytime.
        </Label>
        <Label className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          Anywhere.
        </Label>
      </div>
    </div>
  );
}
