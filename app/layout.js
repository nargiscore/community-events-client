import { Bricolage_Grotesque, Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", weight: ["600", "800"] });
const hind = Hind_Siliguri({ subsets: ["latin", "bengali"], variable: "--font-hind", weight: ["400", "500", "600"] });

export const metadata = {
  title: "Hatey Hat | Community service events",
  description: "Create, join and track social service events in your neighbourhood.",
};

const themeScript = `try{var t=localStorage.getItem("theme")||(matchMedia("(prefers-color-scheme: dark)").matches?"csp-dark":"csp-light");document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="csp-light" suppressHydrationWarning className={`${bricolage.variable} ${hind.variable}`}>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" toastOptions={{ duration: 3500 }} />
      </body>
    </html>
  );
}
