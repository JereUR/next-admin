/** @type {import('next').NextConfig} */
const nextConfig = {
  target: 'serverless',
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
