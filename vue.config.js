module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    port: 8080,
  },
  pwa: {
    name: 'AllDeal',
    themeColor: '#ffffff',
    manifestPath: 'manifest.json',
    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'src/sw.js',
      swDest: 'service-worker.js',
      exclude: [/_redirects/],
      navigateFallback: 'index.html',
      // ...other Workbox options...
    },
  },
}
