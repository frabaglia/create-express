import 'babel-polyfill'

process.env.NODE_ENV = 'test'

import chai from 'chai'
import chaiHttp from 'chai-http'
// import app from '../app'

let should = chai.should()
let expect = chai.expect
chai.use(chaiHttp)

describe('API', () => {
  // describe('Test seed setup is completed correctly', () => {
  //   it('[GET] /', (done) => {
  //     chai.request(app)
  //       .get('/')
  //       .end((err, res) => {
  //         res.should.have.status(200)
          // done()
  //       })
  //   })
  // })
})
