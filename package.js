Package.describe({
  name: 'nnanna3wp:autoform-images',
  version: '0.0.7',
  // Brief, one-line summary of the package.
  summary: 's3 Image upload for Autoform without crop',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.3.1');
  api.use('ecmascript');
  api.use('templating@1.2.15');
  api.use('edgee:slingshot@0.7.1');
  api.use('aldeed:autoform@5.8.1');
  api.use('lepozepo:s3@5.2.4');
  api.use('tmeasday:check-npm-versions@0.3.1');
  // api.addAssets(['addImageTemplate.html'], 'client');
  api.addFiles([
    'addImageTemplate.html',
  ], 'client');
  api.addFiles(['SlingshotConfig.js','S3Methods.js'],['client','server']);
  api.addFiles(['SlingshotDirective.js','S3Config.js'],['server']);
  api.addFiles('autoform-images.js', 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('blaze');
  api.use('dispatch:mocha');
  api.use('maxjohansen:autoform-images');
  api.use('xolvio:cleaner');
  api.use('aldeed:collection2-core');
  api.use('aldeed:autoform@5.8.1');
  api.use('aldeed:simple-schema');
  api.use('templating@1.2.15');
  api.imply('tmeasday:check-npm-versions');
  api.addAssets('tests/maintenance.jpg', 'client');
  api.addFiles('tests/dogForms.html','client');
  api.addFiles('tests/shared.tests.js',['client','server']);
  api.addFiles('tests/server.tests.js','server');
  api.addFiles('tests/client.tests.js','client');
  //api.addFiles('autoform-images-tests.js');
});
