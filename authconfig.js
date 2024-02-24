export const authConfig = {
  pages: {
    sigIn: '/login'
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = auth?.user
      const isOnDashborad = request.nextUrl.pathname.starsWith('/dashboard')
      if (isOnDashborad) {
        if (isLoggedIn) return true
        return false
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', request.nextUrl))
      }
      return true
    }
  }
}
