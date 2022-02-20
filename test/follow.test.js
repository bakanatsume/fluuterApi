const Follow = require("../models/followModel")
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
describe('Follow Schema test anything', () => {
    // for insert testing
    it('Add follow testing anything', () => {
        const test_follow = {
        'following': '620de54bc71f990132865ab6',
        'follower': '620de5a6232e0d071221e569'
    };
 
    return Follow.create(test_follow)
    .then((followData) => {
        expect(followData.follower.toString()).toEqual('620de5a6232e0d071221e569');
    });
    });


    // for delete testing
    it('to test the delete post is working or not', async () => {
        const status = await Follow.deleteMany();
        expect(status.ok);
    });


    // it('to test the update', async () => {
    //     return User.findOneAndUpdate({_id :Object('620cf0caec9d765239840bc9')}, 
    //         {$set : {username:'userss'}})
    //     .then(()=>{
    //         return User.findOne({_id : Object('620cf0caec9d765239840bc9')})
    //         .then((un)=>{
    //              expect(un.username).toEqual('userss')
    //         })
    //     })
    
    // });
 
})