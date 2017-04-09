import express from 'express'
import welcome from '../controllers/index'

var router = express.Router()

router.get('/', welcome)

module.exports = router
