import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(req) {
        if (req.nextUrl.pathname.startsWith("/backoffice") && req.nextauth.token?.role != 1) {
            return new NextResponse("you are not authorized");
        }
        if (req.nextUrl.pathname.startsWith("/traveladgent") && req.nextauth.token?.role != 2) {
            return new NextResponse("you are not authorized");
        }
    },
    {
        callbacks: {
            authorized({ req, token }) {
                return !!token;
            },
        },
    },
    {
        pages: {
            signIn: "/auth/signin",
            error: "/api/auth/error",
        },
    }
);

export const config = { matcher: ["/backoffice/:path*", "/traveladgent/:path*"] };
