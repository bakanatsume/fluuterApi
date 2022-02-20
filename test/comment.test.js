const Comment = require("../models/commentModel")
const mongoose = require("mongoose")

const url = "mongodb://localhost:27017/PawFinder_Test"

beforeAll(async ()=> {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
})

afterAll(async ()=> {
    await mongoose.connection.close()
})
describe('Comment Schema test anything', () => {
    //  for insert testing
    it('Add comment testing anything', () => {
        const test_comment = {
        'user_id': '620de5a6232e0d071221e569',
        'post_id': '620de64b5342802fb8027feb',
        'comment':"neww post!!"
    };
 
    return Comment.create(test_comment)
    .then((commentData) => {
        expect(commentData.comment).toEqual('neww post!!');
    });
    });

    it('to test the update', async () => {
        return Comment.findOneAndUpdate({_id :Object('620de852ca040ba39d1b502c')}, 
            {$set : {comment:'next comment'}})
        .then(()=>{
            return Comment.findOne({_id : Object('620de852ca040ba39d1b502c')})
            .then((cn)=>{
                 expect(cn.comment).toEqual('next comment')
            })
        })
    
    });
 
})
