module.exports = {
  transpileDependencies: ['vuetify'],
  pwa: {
    name: 'AllDeal',
    themeColor: '#ffffff',
    msTileColor: '#00468c',
    manifestPath: 'manifest.json',
    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'src/sw.js',
      swDest: 'service-worker.js',
      exclude: [/_redirects/],
      // ...other Workbox options...
    },
  },
}
