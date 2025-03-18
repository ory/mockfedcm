import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { FEDCM_COOKIE_NAME } from '@/lib/fedcm';
import { createLoginFlow, updateLoginFlow } from '@/lib/ory';

export async function GET() {
  try {
    // Create a login flow and return the flow ID
    const flowId = await createLoginFlow();
    return NextResponse.json({ flowId });
  } catch (error) {
    console.error('Create login flow error:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to create login flow',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { flowId, email, password } = await request.json();

    if (!flowId) {
      return NextResponse.json(
        { error: 'Flow ID is required' },
        { status: 400 }
      );
    }

    // Authenticate with Ory Network using the browser flow
    const result = await updateLoginFlow(flowId, email, password);

    // Set the session token as a cookie
    const cookieStore = cookies();
    (await cookieStore).set(FEDCM_COOKIE_NAME, result.sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    return NextResponse.json({
      success: true,
      identity_id: result.identityId,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Authentication failed',
      },
      { status: 401 }
    );
  }
}
