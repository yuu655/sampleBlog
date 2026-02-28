// proxy.js
export async function updateSession(request) {
  const pathname = request.nextUrl.pathname;

  let supabaseResponse = NextResponse.next({ request });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // 未ログイン → リダイレクト（DBアクセスなし）
  if (!user && (
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/setAccount')
  )) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // ログイン済みのときだけDBアクセス（1回に統合）
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select('role')
      .eq("id", user.id)
      .single();

    const role = profile?.role;

    if (role === "pending" && (pathname === '/login' || pathname.startsWith('/dashboard'))) {
      return NextResponse.redirect(new URL('/setAccount', request.url));
    }
    if (role === "user" && (pathname === '/login' || pathname === '/setAccount' || pathname === '/dashboard' || pathname === '/dashboard/mentor')) {
      return NextResponse.redirect(new URL('/dashboard/user', request.url));
    }
    if (role === "mentor" && (pathname === '/login' || pathname === '/setAccount' || pathname === '/dashboard' || pathname === '/dashboard/user')) {
      return NextResponse.redirect(new URL('/dashboard/mentor', request.url));
    }
    // /admin チェックも同じprofileを再利用（2回目のDB不要）
    if (pathname.startsWith('/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return supabaseResponse;
}