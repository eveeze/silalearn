import AdminButton from "@/components/adminButton";
import AdminCard from "@/components/adminCard";
const dummyCourses = [
  {
    id: 1,
    title: "Pengertian Pancasila sebagai Dasar Negara",
    description: "pelajari pancasila sebagai dasar negara",
    price: 0,
  },
  {
    id: 2,
    title: "Pancasila sebagai filosofi negara",
    description: "Pelajari Pancasila sebagai filosofi negara",
    price: 199.99,
  },
  {
    id: 3,
    title: "Sejarah Bagaimana Lahirnya Pancasila",
    description: "Pelajari bagaimana sejarah pancasila ",
  },
];
export default function courseDashboard() {
  return (
    <>
      <div className=" min-h-dvh max-w-screen-xl mx-auto space-y-8 p-8">
        <div className="flex items-center justify-center">
          <h1 className="text-7xl mt-4  font-bold font-spartan">
            Admin Dashboard
          </h1>
        </div>
        <div className="grid grid-cols-2 ">
          <div className="">
            <h1 className="font-bold font-spartan text-[64px]">Buat Course</h1>
          </div>
          <div className="flex items-end justify-end">
            <AdminButton>Buat Course</AdminButton>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {dummyCourses.map((course, i) => (
            <div className="overflow-hidden height-100%" key={i}>
              <AdminCard course={course} key={i} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
  a;
}
