import SideBar from "@/components/nav/sidebar";
import { Toaster } from "sonner";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <main>
            <div className="flex bg-[#202631]">
            <div className="shadow-4xl sticky top-0 min-h-screen w-[200px]">
            <SideBar />
            </div >
            <div className="w-full bg-[#F7F9FC]">
                {children}
                </div>
                </div>
                <Toaster />
        </main>
    );
}

export default HomeLayout;