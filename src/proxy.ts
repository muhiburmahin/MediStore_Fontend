import { Roles } from "@/constants/role";
import { userService } from "@/services/user.service";
import { NextRequest, NextResponse } from "next/server";


export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const sessionToken =
        request.cookies.get("better-auth.session_token") ||
        request.cookies.get("__Secure-better-auth.session_token");

    if (!sessionToken) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
        const { data: session } = await userService.getSession();

        if (!session || !session.user) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        const userRole = session.user.role;

        if (userRole === Roles.admin) {
            if (pathname.startsWith("/seller-dashboard") || pathname === "/dashboard") {
                return NextResponse.redirect(new URL("/admin-dashboard/dashboard", request.url));
            }
        }

        if (userRole === Roles.seller) {
            if (pathname.startsWith("/admin-dashboard") || pathname === "/dashboard") {
                return NextResponse.redirect(new URL("/seller-dashboard/dashboard", request.url));
            }
        }

        if (userRole === Roles.customer) {
            if (pathname.startsWith("/admin-dashboard") || pathname.startsWith("/seller-dashboard")) {
                return NextResponse.redirect(new URL("/", request.url));
            }
        }

        return NextResponse.next();
    } catch (error) {
        console.error("Middleware Error:", error);
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/admin-dashboard/:path*",
        "/seller-dashboard/:path*",
    ],
};