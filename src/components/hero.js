import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { ArrowDownIcon } from "lucide-react"


export default function Hero() {
  return (
    <>
      <div className="flex flex-col w-full h-screen overflow-hidden">
        {/* <Header propClassName="" /> */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="md:text-[80px] text-[60px] font-bold text-center py-20">
            情報戦に、
            <br />
            終止符を。
          </h1>
          <p className="md:text-[25px] text-xl text-center pb-40">「知らなかった」で夢を諦める人を、<br/>ゼロにする。</p>
        </div>
      </div>
    </>
  );
}
