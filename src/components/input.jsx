export default function Input({
  id,
  name,
  title,
  type,
  wrapperClassName,
  className,
  icon,
  ...props
}) {
  return (
    <>
      <div className={`group relative ${wrapperClassName}`}>
        <label htmlFor={id} className="font-bold text-2xl text-merah-200">
          {title}
        </label>
        <input
          type={type}
          id={id}
          name={name}
          className={`p-5 mt-4 placeholder-white text-white outline-none bg-merah-700 w-full text-black/70 border-2 border-red-700 rounded-2xl focus:border-merah-200 ${className}`}
          {...props}
        />
        <div className="absolute top-0 right-5 h-full">
          <div className="flex items-center h-full">{icon}</div>
        </div>
      </div>
    </>
  );
}
