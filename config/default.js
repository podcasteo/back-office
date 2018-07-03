module.exports = {
  server: {
    host: undefined,
    port: 5000,
  },

  // config inside here will be available in the client browser app
  clientConfig: {
    // WARNING: dont put anything sensitive in here - it WILL be publicly visible in the client browser
    apiHost: 'http://localhost:4000/api',
  },
}
