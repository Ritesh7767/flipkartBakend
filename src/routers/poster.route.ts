import { Router } from "express";
import { getFeaturedBrand, getOffer, getPoster } from "../controllers/poster.controller";
const router = Router()

router.route('/poster').get(getPoster)
router.route('/offer').get(getOffer)
router.route('/featuredbrand').get(getFeaturedBrand)

export default router