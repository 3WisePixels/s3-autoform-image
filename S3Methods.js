Meteor.methods({
  GetMaxUploadMB() {
    return Meteor.settings.MAXUploadMB;
  },
});
