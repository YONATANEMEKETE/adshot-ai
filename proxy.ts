import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { auth } from '@/lib/auth';

const DASHBOARD_PATH = '/dashboard';

function isDashboardRoute(pathname: string) {
  return pathname === DASHBOARD_PATH || pathname.startsWith(`${DASHBOARD_PATH}/`);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let session = null;

  try {
    session = await auth.api.getSession({
      headers: request.headers,
    });
  } catch (error) {
    console.error('Failed to read auth session in proxy', error);
  }

  const isAuthenticated = Boolean(session);
  const isDashboardRequest = isDashboardRoute(pathname);

  if (!isAuthenticated && isDashboardRequest) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isAuthenticated && !isDashboardRequest) {
    return NextResponse.redirect(new URL(DASHBOARD_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    {
      source:
        '/((?!api|_next/data|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
