import Footer from "@/components/footer";
import { josefin } from "@/app/layout";
export const metadata = {
  title: "Admin Login Silalearn",
  description: "Halaman Login Admin Silalearn",
};
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`!text-white ${josefin.className} bg-merah-100 `}
    >
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
