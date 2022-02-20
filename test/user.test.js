const User = require("../models/userModel")
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
describe('User Schema test anything', () => {
    //  for insert testing
    it('Add user testing anything', () => {
        const test_user = {
        'username': 'krisha',
        'password': 'krsiha11'
    };
 
    return User.create(test_user)
    .then((userdata) => {
        expect(userdata.username).toEqual('krisha');
    });
    });

    it('to test the update', async () => {
        return User.findOneAndUpdate({_id :Object('620de54bc71f990132865ab6')}, 
            {$set : {username:'tae'}})
        .then(()=>{
            return User.findOne({_id : Object('620de54bc71f990132865ab6')})
            .then((un)=>{
                 expect(un.username).toEqual('tae')
            })
        })
    
    });
 
})