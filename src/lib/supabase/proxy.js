import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({
    request,
  })
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )
  // refreshing the auth token
  const { data: { user }, error } = await supabase.auth.getUser()

  // 1. 未ログインならログインページへ (チャットや管理画面へのアクセス時)
  if (!user && (request.nextUrl.pathname.startsWith('/dashbord') || request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname.startsWith('/setAccount'))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select('role')
      .eq("id", user?.id)
      .single();
    if(profile.role === "pending" && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname.startsWith('/dashbord'))){
      return NextResponse.redirect(new URL('/setAccount', request.url))
    }else if(profile.role === "user" && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/setAccount' || request.nextUrl.pathname === '/dashbord' || request.nextUrl.pathname === '/dashbord/mentor')){
      return NextResponse.redirect(new URL('/dashbord/user', request.url))
    }else if(profile.role === "mentor" && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/setAccount' || request.nextUrl.pathname === '/dashbord' || request.nextUrl.pathname === '/dashbord/user')){
      return NextResponse.redirect(new URL('/dashbord/mentor', request.url))
    }
  }
  
    // console.log(user, error)

  // 2. 管理者制限 (Adminパスにアクセスした場合)
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user?.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url)) // 一般ユーザーならトップへ
    }
  }
  return supabaseResponse
}