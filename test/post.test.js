const Post = require("../models/postModel")
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
describe('Post Schema test anything', () => {
    //  for insert testing
    it('Add post testing anything', () => {
        const test_post = {
        'user_id': '620de54bc71f990132865ab6',
        'caption': 'paw'
    };
 
    return Post.create(test_post)
    .then((postData) => {
        expect(postData.caption).toEqual('paw');
    });
    });


    it('to test the update', async () => {
        return Post.findOneAndUpdate({_id :Object('620de5fe3e8cdbfc97067d61')}, 
            {$set : {caption:'new paww'}})
        .then(()=>{
            return Post.findOne({_id : Object('620de5fe3e8cdbfc97067d61')})
            .then((pd)=>{
                 expect(pd.caption).toEqual('new paww')
            })
        })
    
    });
 
})