Slingshot.createDirective("myFileUploads", Slingshot.S3Storage, {
  bucket: Meteor.settings.AWSBucket || process.env.AWSBucket,

  "AWSAccessKeyId":Meteor.settings.AWSAccessKeyId || process.env.AWSAccessKeyId,
  "AWSSecretAccessKey":Meteor.settings.AWSSecretAccessKey || process.env.AWSSecretAccessKey,
  "region":Meteor.settings.AWSRegion || process.env.AWSRegion,

  acl: "public-read",

  authorize: function () {
    //Deny uploads if user is not logged in.
    if (!this.userId) {
      var message = "Please login before posting files";
      throw new Meteor.Error("Login Required", message);
    }

    return true;
  },

  key: function (file) {
    //Store file into a directory by the user's id
    var user = Meteor.users.findOne(this.userId);
    let fileName = file.name
    fileName = Date.now() + "-" + fileName;
    fileName = fileName.split(' ').join('-');
    return user._id + "/" + fileName;
  },
  maxSize: (Meteor.settings.MAXUploadMB || 10) * 1024 * 1024, // 10 MB (use null for unlimited).
  allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
});
