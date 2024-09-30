import { Router } from "express";
import isAuth from "../middleware/auth.middleware";
import { addToCart, deleteFromCart, getCartData } from "../controllers/cart.controller";

const router = Router()

router.route("/getCart").get(isAuth, getCartData)
router.route("/addToCart/:id").post(isAuth, addToCart)
router.route("/removeCart/:id").post(isAuth, deleteFromCart)


export default router