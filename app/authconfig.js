export const authConfig = {
  providers: [],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async authorized({ auth, request }) {
      const isLoggedIn = auth?.user
      const isOnDashboard = request.nextUrl.pathname.startsWith('/dashboard')

      if (isOnDashboard) {
        if (isLoggedIn) {
          return { redirect: { destination: '/dashboard', permanent: false } }
        } else {
          return false
        }
      } else if (isLoggedIn) {
        return { redirect: { destination: '/dashboard', permanent: false } }
      }

      return true
    }
  }
}
