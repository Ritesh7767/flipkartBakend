import {Router} from 'express'
import { appliances, getProduct } from '../controllers/product.controller'

const router = Router()

router.route('/*').get(appliances)
router.route('/productDetail').get(getProduct)

export default router