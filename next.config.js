/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/tests-next.vercel.app',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*'
      }
    ]
  }
}

module.exports = nextConfig
