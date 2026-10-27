/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Next.js only allows `localhost` to reach dev-only resources (including the
  // HMR websocket) by default. This app is opened over the LAN at 10.16.20.95
  // (see `next dev`'s "Network:" URL) instead of localhost, so the browser's
  // Origin header didn't match, the WS handshake got rejected, and the page
  // was left with a broken/desynced React tree — which showed up as clicks
  // (e.g. filter checkboxes) silently doing nothing.
  allowedDevOrigins: ['127.0.0.1', 'localhost', '10.16.20.95'],
}

export default nextConfig
