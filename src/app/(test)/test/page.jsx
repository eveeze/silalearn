"use client";
import Input from "@/components/input";
import HeroTopIcon from "@/icons/hero_top";

export default function Test() {
  return (
    <div className="pt-24 pb-96 bg-white">
      {/* Button */}
      <h1>ini button</h1>

      <div className="p-12 ">
        <Input
          type={"text"}
          id={"confirmEmail"}
          name={"confirmEmail"}
          title={"Konfirmasi Email"}
          placeholder={"email@gmail.com"}
        />
      </div>
      <div className="p-12">
        <HeroTopIcon />
      </div>
    </div>
  );
}
