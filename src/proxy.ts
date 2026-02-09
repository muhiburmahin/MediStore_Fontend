import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/role";

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const { data } = await userService.getSession();
    const session = data;

    if (!session) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const userRole = session.user.role;

    if (userRole === Roles.admin) {
        if (pathname.startsWith("/seller-dashboard") || pathname === "/dashboard") {
            return NextResponse.redirect(new URL("/admin-dashboard", request.url));
        }
    }

    if (userRole === Roles.seller) {
        if (pathname.startsWith("/admin-dashboard") || pathname === "/dashboard") {
            return NextResponse.redirect(new URL("/seller-dashboard", request.url));
        }
    }

    if (userRole === Roles.customer) {
        if (pathname.startsWith("/admin-dashboard") || pathname.startsWith("/seller-dashboard")) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/admin-dashboard/:path*",
        "/seller-dashboard/:path*",
    ],
};