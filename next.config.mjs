/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  output: 'export',
  // Если деплоите на GitHub Pages в репо hsk-pwa — раскомментируйте:
  // basePath: '/hsk-pwa'
};
export default nextConfig;
