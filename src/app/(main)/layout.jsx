import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export const metadata = {
  title: "Silalearn",
  description: "Web Pembelajaran Pancasila",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`text-black`}>
      <body className="bg-merah-100 ">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
