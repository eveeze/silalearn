import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
export const metadata = {
  title: "Silalearn",
  description: "Halaman belajar pancasila",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="text-black">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
