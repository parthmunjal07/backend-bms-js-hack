import { Router } from "express";
import * as bookingController from "./booking.controller.js";
import authenticate from "../auth/auth.middlewares.js";

const bookingRouter = Router();

bookingRouter.get("/seats", bookingController.getSeats);

bookingRouter.put("/:id", authenticate, bookingController.bookSeat);

export default bookingRouter;