/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
    webpack: (config) => {
        config.experiments={
            ...config.experiments,
            topLevelAwait:true
        }
        config.module.noParse = /@mapbox\/node-pre-gyp/;
        return config;
      },
};

export default nextConfig;
