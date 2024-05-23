"use client"


import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillHome, AiFillMessage, AiOutlineHome, AiOutlineMessage } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark, FaRegBookmark, FaRegUser, FaUser } from "react-icons/fa";
import { IoBookmarkOutline, IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";


 interface SidebarLink {
  icon: {
    icon: React.ReactNode;
    fillIcon: React.ReactNode;
  };
    route: string;
    label : string;
  }
export const sidebarLinks: SidebarLink[] = [
  {
    icon: {
      icon: <AiOutlineHome className="h-[40px] w-[40px] fill-[#5e6375] text-3xl"/>,
      fillIcon: <AiFillHome className="h-[40px] w-[40px] fill-[#fff] text-3xl text-black"/>
    },
    route: "/2",
    label:"home",
  },
  {
    icon: {
      icon: <AiOutlineMessage className="h-[40px] w-[40px] fill-[#5e6375] text-3xl"/>,
      fillIcon: <AiFillMessage   className="h-[40px] w-[40px] fill-[#fff] text-3xl text-black"/>
    },
    route: "/",
    label:"message"
  },
  {
    icon: {
      icon: <FaRegUser  className="h-[40px] w-[40px] fill-[#5e6375] text-3xl"/>,
      fillIcon: <FaUser    className="h-[40px] w-[40px] fill-[#fff] text-3xl text-black"/>
    },
    route: "/profile",
    label:"profile"
  },
  {
    icon: {
      icon: <FaRegBookmark      className="h-[40px] w-[40px] fill-[#5e6375] text-3xl"/>,
      fillIcon: <FaBookmark    className="h-[40px] w-[40px] fill-[#fff] text-3xl text-black"/>
    },
    route: "/",
    label:"bookmark"
  },
  {
    icon: {
      icon: <IoSettingsOutline       className="h-[55px] w-[55px] border-t border-t-[#5e6375] fill-[#5e6375] text-3xl"/>,
      fillIcon: <IoSettingsSharp     className="h-[55px] w-[55px] border-t-2 border-t-[#5e6375] fill-[#fff] p-2 text-3xl text-black"/>
    },
    route: "/setting",
    label:"setting"
  },
];

function SideNavItem({
    route,
  
    icon,
    label
  }: SidebarLink ) {
    
    const pathname = usePathname();
    const isActivePage = pathname == route;
    return (
      <Link
        
        href={route}
        className="flex cursor-pointer items-center gap-2"
      >
        {/* icon */}
        <div className="py-2 text-3xl">
          {/* <FaXTwitter /> */}
          {isActivePage ? icon?.fillIcon : icon?.icon}
        </div>
        {/* label */}
        
      </Link>
    );
  }
  
const SideBar=()=>{
   
    
    return(
        <div className={
          "min-h-screen max-h-screen overflow-y-auto w-fit md:pr-8 pr-3 pt-2 flex flex-col gap-3  pl-[50px]"
          
        } >
            <h1> <header>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header></h1>
            <div className="flex h-full flex-1 flex-col items-center justify-end gap-6">
            {sidebarLinks.map((d, i) => (
          <SideNavItem
                key={i}
                icon={d.icon}
                route={d.route}

                label={d.label}        />
     
      ))}
      <div></div>
                </div>
        </div>
    )
}
export default SideBar
