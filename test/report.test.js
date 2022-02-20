const Report = require("../models/reportModel")
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
describe('Report Schema test anything', () => {
    //  for insert testing
    it('Add report testing anything', () => {
        const test_report = {
        'user_id': '620de54bc71f990132865ab6',
        'post_id': '620de5fe3e8cdbfc97067d61'
    };
 
    return Report.create(test_report)
    .then((reportData) => {
        expect(reportData.post_id.toString()).toEqual('620de5fe3e8cdbfc97067d61');
    });
    });
 
})

