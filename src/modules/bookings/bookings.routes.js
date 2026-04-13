import { Router } from "express";
import * as bookingController from "./booking.controller.js";
import authenticate from "../auth/auth.middlewares.js";

const bookingRouter = Router();

// Public route: Anyone can see seats
bookingRouter.get("/seats", bookingController.getSeats);

// Protected route: Only logged in users can book
// Notice we added the 'authenticate' middleware here!
bookingRouter.put("/:id", authenticate, bookingController.bookSeat);

export default bookingRouter;