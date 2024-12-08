const nextConfig = {
    webpack: (config) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "encoding": false,
        "crypto": false,
        "stream": false,
        "http": false,
        "https": false,
        "os": false,
        "url": false
      }
      return config
    },
};

export default nextConfig;
