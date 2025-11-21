import { NextResponse, NextRequest } from 'next/server';
import { auth } from './lib/auth';
import { headers } from 'next/headers';
import { SERVER_URL } from './lib/constants';

export const proxy = async (req: NextRequest) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const invalidToken = req.nextUrl.searchParams
    .get('error')
    ?.includes('INVALID_TOKEN');

  const { pathname } = req.nextUrl;

  if (session && session.user.role !== 'admin' && pathname === '/register') {
    return NextResponse.redirect(new URL('/', req.url));
  } else if (
    session &&
    session.user.role !== 'admin' &&
    pathname === '/signin'
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  } else if (
    (!session || session.user.emailVerified) &&
    pathname === '/verify-email'
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  } else if (
    session &&
    session.user.role !== 'admin' &&
    pathname === '/forgot-password'
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  } else if (invalidToken && pathname === '/reset-password') {
    return NextResponse.redirect(
      new URL('/verification?status=false', req.url)
    );
  } else if (!session && pathname === '/checkout/shipping-address') {
    return NextResponse.redirect(
      new URL(
        `/signin?callbackUrl=${SERVER_URL}/checkout/shipping-address`,
        req.url
      )
    );
  } else if (!session && pathname === '/checkout/payment-method') {
    return NextResponse.redirect(
      new URL(
        `/signin?callbackUrl=${SERVER_URL}/checkout/payment-method`,
        req.url
      )
    );
  } else if (!session && pathname === '/checkout/place-order') {
    return NextResponse.redirect(
      new URL(`/signin?callbackUrl=${SERVER_URL}/checkout/place-order`, req.url)
    );
  }

  // Storing cartId in cookies
  if (!req.cookies.get('sessionCartId')) {
    // generate a unique cartId
    const sessionCartId = crypto.randomUUID();
    const res = NextResponse.next();
    res.cookies.set('sessionCartId', sessionCartId, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return res;
  }
};
export const config = {
  matcher: [
    '/register',
    '/signin',
    '/verify-email',
    '/forgot-password',
    '/reset-password',
    '/checkout/shipping-address',
    '/checkout/payment-method',
    '/checkout/place-order',
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
};
