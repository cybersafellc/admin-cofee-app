import { NextResponse } from "next/server";
import authMiddleware from "./utils/middlewares/auth-middleware";

const auth = ["/dashboard", "/products", "/"];

export default async function middleware(request) {
  const url = new URL(request.url);
  if (auth.includes(url.pathname)) {
    const response = await authMiddleware(request);
    return response;
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/", "/dashboard", "/products"],
};
