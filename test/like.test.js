const Like = require("../models/likeModel")
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
describe('Like Schema test anything', () => {
    //  for insert testing
    it('Add follow testing anything', () => {
        const test_like = {
        'user_id': '620de5a6232e0d071221e569',
        'post_id': '620de5fe3e8cdbfc97067d61'
    };
 
    return Like.create(test_like)
    .then((likeData) => {
        expect(likeData.post_id.toString()).toEqual('620de5fe3e8cdbfc97067d61');
    });
    });

 
})
