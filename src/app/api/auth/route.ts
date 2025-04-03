import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { FEDCM_COOKIE_NAME, createUserCookie } from '@/lib/fedcm';
import { getCookieOptions } from '@/utils/https';

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json();

    // We don't validate the password - accept any credentials
    // Just check if username is provided
    if (!username || typeof username !== 'string' || username.trim() === '') {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    // Create a session token (JWT) with the username
    const sessionToken = createUserCookie(username);

    // Get cookie options based on HTTPS detection
    const cookieOptions = getCookieOptions(request);

    console.log(
      `Setting cookie with options: ${JSON.stringify(cookieOptions)}`
    );

    // Set the session token as a cookie
    const cookieStore = await cookies();
    cookieStore.set(FEDCM_COOKIE_NAME, sessionToken, cookieOptions);

    return NextResponse.json({
      success: true,
      username,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Authentication failed',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ key: 'Your Funny!' });
}
