// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { userAgent } from 'next/server';

export function middleware(request: NextRequest) {
    const { device } = userAgent(request);
    const isMobile = device.type === 'mobile';

    // Set a cookie to indicate mobile device type
    const response = NextResponse.next();
    response.cookies.set('X-Is-Mobile', String(isMobile), {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,  // Expires in a week
    });

    return response;
}

export const config = {
    matcher: '/:path*',
};
