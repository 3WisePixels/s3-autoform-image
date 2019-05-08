Slingshot.fileRestrictions("myFileUploads", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
  maxSize: (Meteor.settings.MAXUploadMB || 10) * 1024 * 1024 // 10 MB (use null for unlimited).
});
