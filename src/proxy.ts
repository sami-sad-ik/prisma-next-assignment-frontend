import { NextRequest, NextResponse } from "next/server";
import { userService } from "./app/modules/user.service";

const allowedRoles = ["STUDENT", "TUTOR", "ADMIN"];

export const proxy = async (request: NextRequest) => {
  const { user } = await userService.getSession();
  if (!user) return NextResponse.redirect(new URL("/login", request.url));
  if (!allowedRoles.includes(user.role)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/dashboard/:path*"],
};
