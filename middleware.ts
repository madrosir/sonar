import { authMiddleware } from "@clerk/nextjs";


export default authMiddleware({
    publicRoutes: ["/api/uploadthing",'/favicon.ico.']
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)","/","/(api|trpc)(.*)"],
}

// Ensure /socket.io is included in public routes
