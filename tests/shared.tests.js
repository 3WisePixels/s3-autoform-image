import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Blaze } from 'meteor/blaze';
import { $ } from 'meteor/jquery';

describe('shared tests', function(){
    beforeEach(function(){
        //possibly reset db here
    });
    it('should run some shared test', function(){
        const Dogs = new Mongo.Collection('dogs');
        const dogsSchema = new SimpleSchema({
            name:{
                type:String,
            },
            photo:{
                type:String,
                autoform:{
                    afFieldInput:{
                        type:'afImageElem',
                    },
                },
            },
            images:{
                type:Array,
            },
            'images.$':{
                type:String,
                autoform:{
                    afFieldInput:{
                        type:'afImageElem',
                    },
                },
            },
        });
        Dogs.attachSchema(dogsSchema);

        
        if(Meteor.isClient){
            const root = document.createElement('div');
            document.body.appendChild(root);
            const insertForm = Blaze.renderWithData(Template.quickForm, {
                collection:Dogs,
                id:"insertDogsForm",
                type:"insert",
            }, root);
            const formElem = $(root).find("#insertDogsForm");
            formElem.find(".btn-picker").each((i,btn) => {
                btn.click();
            });
        }
    });
});
