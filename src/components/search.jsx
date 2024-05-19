import { GoSearch } from "react-icons/go";

export default function Search({
  id,
  name,
  type,
  wrapperClassName,
  className,
  icon,
  ...props
}) {
  return (
    <>
      <div className={`group relative ${wrapperClassName}`}>
        <input
          type={type}
          id={id}
          name={name}
          className={`p-5 mt-4 outline-none bg-white w-full text-black/70 border-2 border-black rounded-2xl focus:border-merah-900 ${className}`}
          {...props}
        />
        <div className="absolute top-0 right-5 h-full">
          <GoSearch size={40} className=" mt-8" />
        </div>
      </div>
    </>
  );
}
