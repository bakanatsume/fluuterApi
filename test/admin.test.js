const Admin = require("../models/adminModel")
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
describe('Admin Schema test anything', () => {
    //  for insert testing
    it('Add admin testing anything', () => {
        const test_admin = {
        'username': 'admin',
        'password': 'admin'
    };
 
    return Admin.create(test_admin)
    .then((adminData) => {
        expect(adminData.username).toEqual('admin');
    });
});


})