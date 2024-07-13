"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillHome, AiFillMessage, AiOutlineHome, AiOutlineMessage } from "react-icons/ai";
import { FaRegUser, FaUser } from "react-icons/fa";
import { IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";
import { User } from "@prisma/client";
import { CreateStory } from "@/components/story/CreateStory";


interface SidebarLink {
  icon: {
    icon: React.ReactNode;
    fillIcon: React.ReactNode;
  };
  route: string;
  label: string;
}

interface Props {
  user: User;
}

export const sidebarLinks: SidebarLink[] = [
  {
    icon: {
      icon: <AiOutlineHome className="h-6 w-6" />,
      fillIcon: <AiFillHome className="h-6 w-6" />,
    },
    route: "/",
    label: "Home",
  },
  {
    icon: {
      icon: <AiOutlineMessage className="h-6 w-6" />,
      fillIcon: <AiFillMessage className="h-6 w-6" />,
    },
    route: "/chat",
    label: "Message",
  },
  {
    icon: {
      icon: <FaRegUser className="h-6 w-6" />,
      fillIcon: <FaUser className="h-6 w-6" />,
    },
    route: "/profile",
    label: "Profile",
  },
  {
    icon: {
      icon: <IoSettingsOutline className="h-6 w-6" />,
      fillIcon: <IoSettingsSharp className="h-6 w-6" />,
    },
    route: "/setting",
    label: "Setting",
  },
];

function SideNavItem({ route, icon, label }: SidebarLink) {
  const pathname = usePathname();
  const isActivePage = route === "/" ? pathname === route : pathname.startsWith(route);

  return (
    <Link
      href={route}
      className={`group flex items-center gap-4 rounded-lg px-4 py-3 transition-all duration-300 ease-in-out
        ${isActivePage
          ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
          : "text-gray-400 hover:bg-gray-800 hover:text-white"
        }`}
    >
      <div className={`text-2xl transition-transform duration-300 ease-in-out ${isActivePage ? "scale-110" : "group-hover:scale-110"}`}>
        {isActivePage ? icon.fillIcon : icon.icon}
      </div>
      <span className="text-sm font-medium">
        {label}
      </span>
    </Link>
  );
}

const SideBar = () => {
  return (
    <div
      className={`relative flex h-screen w-80 flex-col bg-gray-700 text-white transition-all duration-300 ease-in-out`}
    >
      <header className="mb-6 flex items-center justify-center p-4">
        <div className="text-2xl font-bold">Sonar</div>
      </header>
      <nav className="mx-10 flex-1 space-y-2">
        {sidebarLinks.slice(0,3).map((link, index) => (
          <div key={index}>
            <SideNavItem {...link} />
          </div>
        ))}
        <div>
         
        </div>
        {sidebarLinks.slice(3).map((link, index) => (
          <div key={index}>
            <SideNavItem {...link} />
          </div>
        ))}
      </nav>
      <div className="flex items-center justify-center border-t border-gray-700 p-4">
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
            }}
          />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
              Sign in
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  );
};

export default SideBar;
