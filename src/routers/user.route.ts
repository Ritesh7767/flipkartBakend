import { Router } from "express";
import { createAddress, getAddress, updateAddress, updateUserProfile, userLogin, userRegister } from "../controllers/user.controller";
import isAuth from "../middleware/auth.middleware";

const router = Router()

router.route("/register").post(userRegister)
router.route('/login').post(userLogin)
router.route('/address').get(isAuth, getAddress)
router.route('/createAddress').post(isAuth, createAddress)
router.route('/updateProfile').post(updateUserProfile)
router.route('/updateAddress').post(isAuth, updateAddress)

export default router