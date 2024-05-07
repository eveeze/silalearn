import Footer from "@/components/footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
