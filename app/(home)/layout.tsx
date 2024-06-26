import SideBar from "@/components/nav/sidebar";
import { Toaster } from "sonner";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main>
            <div className="flex bg-[#F7F9FC]">
                <div className="shadow-4xl fixed left-0 top-0 min-h-screen w-[300px] bg-gray-800 text-white">
                    <SideBar />
                </div>
                <div className="ml-[300px] mr-[500px] w-full bg-[#F7F9FC]">
                    {children}
                </div>
                <div className="rounded-l-5xl fixed right-0 top-0 h-full w-[500px] bg-[#E4E9F2]">
                   
                </div>
            </div>
            <Toaster />
        </main>
    );
}

export default HomeLayout;
