import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';

const logging = false;

let log = () => "";

if(logging)
    log = console.log;

log('we are logging');
checkNpmVersions({
    'exif-js':'2.2.1',
},'nnanna3wp:autoform-images');
EXIF = require('exif-js');

const fileUrlMap = {};

AutoForm.addInputType('afImageElem', {
  template:'addImageElemTemplate',
  valueOut(){
    return fileUrlMap[this.attr('data-schema-key')].get();
  }
});


Template.addImageElemTemplate.onCreated(function(){
  log('created template');
  this.uploader = new Slingshot.Upload("myFileUploads");

  fileUrlMap[this.data.name] = new ReactiveVar(Template.instance().data.value || '');

  this.fileUrl = () => {
    return fileUrlMap[this.data.name];
  }
  this.imageExists = new ReactiveVar(false);
  this.imageId = this.data.name.replace(".","-");
  const imageIdSave = this.imageId;
  //Template.instance.im
  this.reader = new FileReader();
  this.reader.addEventListener("load", (event) => {
      this.uploader = null;
      log('creating new uploader');
      this.uploader = new Slingshot.Upload("myFileUploads");
      log('binding new croppie');
      let imageEl = this.imageEl;
      const blob = new Blob([event.target.result]);
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      var img = new Image();
      img.src = window.URL.createObjectURL(blob);
      let exifInfo;
      try {
        exifInfo = EXIF.readFromBinaryFile(event.target.result);
      } catch (e) {
        // couldn't extract EXIF metadata
      }
      const MAX_BYTES = 1000000;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        if (blob.size > MAX_BYTES) {
          canvas.width = canvas.width / 4;
          canvas.height = canvas.height / 4;
        }
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
        let config = {
            url:canvas.toDataURL(),
            orientation: exifInfo && exifInfo.Orientation,
        };
        let d = document.getElementById(this.imageId);
        d.appendChild(canvas)
        // debugger;
      };
      this.imageExists.set(true);
  });
});
Template.addImageElemTemplate.onDestroyed(function(){

});

Template.addImageElemTemplate.events({
  'change .image-file-button'(event, target){
    Template.instance().fileUrl().set("");
    if(event.target.files.length !== 0){

      Template.instance().filename = Date.now() + event.target.files[0].name;
      Template.instance().file = event.target.files[0];
      log('creating new croppie');
      //display image here
      log('new croppie created');
      Template.instance().reader.readAsArrayBuffer(event.target.files[0]);
    }
    return false;
  },
  'click a'(event, target){
    log('clicked file selector button');
    $('.upload-' + Template.instance().imageId).click();
    return false;
  },
  'click .uploadButton'(event, target){
      const templateInstance = Template.instance();
      log('uploading croppie data');
      log('obtained croppie blob');
      let imageFile = templateInstance.file
      imageFile.name = templateInstance.filename;
      document.getElementById(templateInstance.imageId).remove();
      templateInstance.imageExists.set(false);
      templateInstance.uploader.send(imageFile, function (error, downloadUrl) {
        if (error) {
          log(error);
          templateInstance.fileUrl().set("");
        }
        else {
          log('setting new download url', downloadUrl);
          templateInstance.fileUrl().set(downloadUrl);
          log(templateInstance.uploader.dataUri);
          log('current uploader url', templateInstance.uploader.url(true));
        }
      });
      return false;
  }
});

Template.addImageElemTemplate.helpers({
  progress: function () {
    return Math.round(Template.instance().uploader.progress() * 100);
  },
  url: function(){
    if(Template.instance().fileUrl().get() === ""){
        return Template.instance().uploader.url(true);
    }
    return Template.instance().fileUrl().get();
  },
  shouldShowProgress: function(){
    return !isNaN(Template.instance().uploader.progress());
  },
  getAtts() {
    return this.atts;
  },
  imageId() {
    return Template.instance().imageId;
  },
  imageExists() {
    return Template.instance().imageExists.get();
  },
});
