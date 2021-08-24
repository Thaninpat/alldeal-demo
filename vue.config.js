module.exports = {
  transpileDependencies: ['vuetify'],
  pwa: {
    name: 'AllDeal',
    manifestPath: 'img/icons2/manifest.json',
    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'src/sw.js',
      swDest: 'service-worker.js',
      // ...other Workbox options...
    },
  },
}
