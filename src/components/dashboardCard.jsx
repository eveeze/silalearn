export default function DashboardCard({ title, count }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-4xl font-bold mt-4">{count}</p>
    </div>
  );
}
