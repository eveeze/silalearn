import AdminButton2 from "./adminButton2";
import Image from "next/image";

export default function AdminQuizCard({ quiz, onEdit, onDelete }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mx-auto border-2 border-black transform transition-transform hover:scale-105 min-h-[550px] duration-300 flex flex-col">
      <div className="p-8 flex justify-center items-center">
        <Image
          src={"/logo/logo_silalearn.png"}
          width={150}
          height={150}
          alt="logo silalearn"
          className="transition-opacity duration-300 hover:opacity-80"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-2xl font-bold transition-colors duration-300 hover:text-merah-300">
          {quiz.title}
        </h2>
        <p className="transition-colors duration-300 hover:text-gray-700 flex-grow pt-2">
          {quiz.description}
        </p>
        <div className="grid grid-cols-2 gap-8 items-center mt-4">
          <div>
            <AdminButton2
              onClick={onEdit}
              className="!bg-white border-2 border-merah-300 !text-merah-300 transition-colors duration-300 hover:!bg-merah-200"
            >
              Edit Quiz
            </AdminButton2>
          </div>
          <div>
            <AdminButton2
              onClick={onDelete}
              className="!bg-merah-300 border-2 border-merah-300 transition-colors duration-300 hover:!bg-merah-700"
            >
              Delete Quiz
            </AdminButton2>
          </div>
        </div>
      </div>
    </div>
  );
}
