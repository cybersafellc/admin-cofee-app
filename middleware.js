import { NextResponse } from "next/server";
import authMiddleware from "./utils/middlewares/auth-middleware";

const auth = [
  "/dashboard",
  "/products",
  "/",
  "/orders/processing",
  "/orders/pending",
  "/orders/cancel",
  "/orders/done",
  "/sold-report",
  "/sold-report/print",
];

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
  matcher: [
    "/",
    "/dashboard",
    "/products",
    "/orders/processing",
    "/orders/pending",
    "/orders/cancel",
    "/orders/done",
    "/sold-report",
    "/sold-report/print",
  ],
};
