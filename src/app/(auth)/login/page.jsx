import Link from "next/link";
import Image from "next/image";
import Input from "@/components/input";
import Button from "@/components/button";
export default function loginPage() {
  return (
    <>
      <form action="">
        <div className=" bg-merah-100">
          <div className="grid grid-cols-1 md:grid-cols-2 p-16 space-y-4 w-full max-w-screen-2xl min-h-dvh justify-center  ">
            <div className=" flex items-center justify-center">
              <div className="hidden md:block">
                <Image
                  src={"/image/login_bg.png"}
                  alt="login background"
                  width={500}
                  height={500}
                />
              </div>
            </div>

            <div className="p-8 space-y-4 border-4 border-merah-400 rounded-2xl bg-merah-300">
              <div className="p-4 space-y-4">
                <div className="flex gap-8">
                  <Image
                    src={"/logo/logo_silalearn.png"}
                    width={50}
                    height={50}
                    alt="logo silalearn"
                  />
                  <h1 className="mt-2 text-2xl font-semibold ">SILALEARN</h1>
                </div>
                <div>
                  <p className="text-xl font-bold">Selamat Datang</p>
                  <p className="text-md text-regular mt-2">
                    Permudah Belajar Pancasila dengan SILALEARN
                  </p>
                  <div className="mt-2">
                    <Input
                      type={"text"}
                      id={"email"}
                      name={"email"}
                      title={"Email"}
                      placeholder={"something@gmail"}
                      className={"mt-4"}
                    />
                    <Input
                      type={"text"}
                      id={"Password"}
                      name={"Password"}
                      title={"Password"}
                      placeholder={"********"}
                      className={"mt-4"}
                    />
                  </div>
                </div>
                <div>
                  <Button onClick={""} children={"sign in"} />
                  <p>
                    Belum punya akun ? <span>Sign Up</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
