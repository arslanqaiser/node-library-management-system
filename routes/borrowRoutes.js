import express from "express";
import {
  borrowedBooks,
  getBorrowedBooksForAdmin,
  recordBorrowedBooks,
  returnBorrowBook,
} from "../controllers/borrowController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { isAuthorized } from "../controllers/authController.js";

const router = express.Router();

router.post(
  "/record-borrow-book/:id",
  isAuthenticated,
  isAuthorized("Admin"),
  recordBorrowedBooks
);

router.get(
  "/borrowed-books-by-user",
  isAuthenticated,
  isAuthorized("Admin"),
  getBorrowedBooksForAdmin
);

router.get("/my-borrowed-books", isAuthenticated, borrowedBooks);

router.put(
  "/return-borrowed-book/:bookId",
  isAuthenticated,
  isAuthorized("Admin"),
  returnBorrowBook
);

export default router;
