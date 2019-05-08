# Autoform Images
An atmosphere package for adding image upload support to Autoform
Fork from https://github.com/macsj200/autoform-images removed cropping

## Installation

### Add package
```bash
meteor add nnanna3wp:autoform-images
```

### Install peer dependencies
```bash
meteor npm install --save exif-js@2.2.1
```

## Configuration

### Settings configuration
We assume you have various S3 variables and MAXUpload configured in your `Meteor.settings` file

```json
{
    "AWSAccessKeyId": "********************",
    "AWSSecretAccessKey": "****************************************",
    "AWSRegion": "*********",
    "AWSBucket": "*************",
    "MAXUploadMB": 10
}
```


### Add image[s] key to schema
You can just add a key of `type: String` if you want. It's ok to declare this as an array of strings if you want multiple images.

You can specify the custom autoform component inline in the schema, or you can specify it after-the-fact in your UI code via `Collection.simpleSchema().addAutoFormOptions(options)`.

Inline example
```javascript
new SimpleSchema({
    image:{
        type: String,
        autoform:{
            afFieldInput:{
                type: 'afImageElem',
            }
        },
    },
});
```

Outside of schema example
```javascript
dogsSchema = SimpleSchema({
    image:{
        type: String,
    },
});
// ...
// possibly in some other file
Dogs.simpleSchema.addAutoFormOptions({
    image:{
        afFieldInput:{
            type: 'afImageElem',
        }
    }
});
```

Now, just render an autoform somewhere that uses this schema.
