import { Router } from "express";
import guestController from "../controllers/guest.controller";
import passport from "../middlewares/auth.mid";


// API ROUTE /api/v1/guest
const router = Router();

// ------ MIDDLEWARE ----------------------------
router.use(passport.authenticate("userJWT", { session: false }));

// ------ GET ----------------------------
router
    .get("/test/all", guestController.getAllTest)
    .get("/", guestController.getAll)
    .get("/:id", guestController.getOne);

// ------ POST ----------------------------
router
    .post("/", guestController.createOne);

// ------ PATCH ----------------------------
router
    .patch("/:id", guestController.updateOne);

// ------ DELETE ----------------------------
router
    .delete("/:id", guestController.deleteOne)
    .delete("/all/guests", guestController.deleteAll);


// ------ EXPORT ----------------------------
export default router
