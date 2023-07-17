
import { authMiddleware} from '@clerk/nextjs'

// Give access to public
export default authMiddleware({
    publicRoutes: [
        "/api/:path*"
    ]
})

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}