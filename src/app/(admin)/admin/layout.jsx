import Footer from "@/components/footer";
import NavbarAdmin from "@/components/navbarAdmin";

export const metadata = {
  title: "Silalearn",
  description: "Web Pembelajaran Pancasila",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="text-black">
      <body>
        <NavbarAdmin />
        {children}
        <Footer />
      </body>
    </html>
  );
}
