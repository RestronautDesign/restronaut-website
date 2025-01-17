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

export default function Home() {
  return (
    <div
      style={{height:'1000px'}}
    >
      <section className="w-100 h-screen p-2 lg:p-4 relative overflow-hidden">
      <div className="w-full h-3/4 relative ">
      
        <div style={{zIndex:2}} className="relative w-4/5 mx-auto  py-32">
          <h1 className="text-5xl w-full lg:w-3/5 xl:text-7xl text-white font-extrabold">Reaching Customers
          In the Digital Stratosphere</h1>
          <p className="text-xl lg:text-2xl text-gray-200 mt-4">All-in-one platform for Restauranteurs by Restauranteurs.</p>
          <button className="px-4 font-medium py-2 rounded-full mt-8 bg-blue-600 text-white">   Learn More</button>

        </div>
        <img
  className="absolute w-full h-full top-0 left-0"
  style={{
    zIndex: 1,
    mixBlendMode: 'color-burn',
    opacity:0.5
  }}
  src={'/textures/grid1.png'}
/>      

<GradientScene colorA={"#FF758C"} colorB={"#7A691E"} colorC={"#311EFF"} colorD={"#9B009B"}/></div>
<GlobeScene/>
{/* <div className="w-[1040px] h-[700px] left-0 lg:left-44 mx-auto absolute bg-red-500 blur-3xl translate-y-32 rounded-full opacity-50"></div> */}




      </section>
 
    </div>
  );
}
