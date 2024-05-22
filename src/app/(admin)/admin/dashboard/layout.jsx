import Footer from "@/components/footer";
import NavbarAdmin from "@/components/navbarAdmin";
import { josefin } from "@/app/layout";
export const metadata = {
  title: "Admin Page Silalearn",
  description: "Halaman Admin Silalearn",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`text-black ${josefin.className} `}>
      <body>
        <NavbarAdmin />
        {children}
        <Footer />
      </body>
    </html>
  );
}
