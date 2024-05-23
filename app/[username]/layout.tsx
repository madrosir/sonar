import SideBar from "@/components/nav/sidebar";
import { fetchProfile, initializer } from "@/lib/user";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

type Props = {
   
    children: React.ReactNode;
  };
 
const  HomeLayout = async({ children,}: Props) => {
  
    await initializer();
    return (
        <main>
            <div className="flex bg-[#202631]">
            <div className="shadow-4xl sticky top-0 min-h-screen w-[200px]">
            <SideBar />
            </div >
            <div className="w-full bg-[#f7f7f7]">
                {children}
                </div>
                </div>

        </main>
    );
}

export default HomeLayout;