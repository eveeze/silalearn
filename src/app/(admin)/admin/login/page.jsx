import Input from "@/components/input";

export default function loginAdmin() {
  return (
    <>
      <div className="w-full min-h-dvh mx-auto p-8">
        <div className="flex items-center justify-center rounded-2xl max-w-screen-xl ">
          <div>
            <h1>Login Page</h1>
          </div>
          <div>
            <Input
              id={"emailAdmin"}
              name={"emailAdmin"}
              title={"Email"}
              type={"email"}
              className=""
            />
            <Input
              id={"password"}
              name={"password"}
              title={"Password"}
              type={"password"}
              className=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
