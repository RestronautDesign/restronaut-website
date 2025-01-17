import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import GradientScene from "@/components/gradientscene";
import GlobeScene from "@/components/globescene";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Platform() {
  return (
    <div
      style={{height:'1000px'}}
    >
      <section className="w-100 h-screen p-2 lg:p-4 relative overflow-hidden">
      <div className="w-full h-4/5 relative ">
      
        <div style={{zIndex:2}} className="relative w-4/5 mx-auto  py-32">
          <h1 className="text-5xl w-full lg:w-5/5 xl:text-7xl text-white font-extrabold">Reaching Customers
          Revolutionize your restaurant experience with our all-inclusive solution.</h1>
          <p className="text-xl lg:text-2xl text-gray-200 mt-4">From reservations to payments and analytics, we’ve got you covered.</p>
          <button className="px-4 font-medium py-2 rounded-full mt-8 bg-blue-600 text-white">   Learn More</button>

        </div>
           

<GradientScene colorA={"#D48EFF"} colorB={"#F5FF3B"} colorC={"#F5FF3B"} colorD={"#3F995A"}/></div>
<GlobeScene/>
{/* <div className="w-[1040px] h-[700px] left-0 lg:left-44 mx-auto absolute bg-red-500 blur-3xl translate-y-32 rounded-full opacity-50"></div> */}




      </section>
 
    </div>
  );
}
