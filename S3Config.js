S3.config = {
  key: Meteor.settings.AWSAccessKeyId || process.env.AWSAccessKeyId,
  secret: Meteor.settings.AWSSecretAccessKey || process.env.AWSSecretAccessKey,
  bucket: Meteor.settings.AWSBucket || process.env.AWSBucket,
  region: Meteor.settings.AWSRegion || process.env.AWSRegion,
};
