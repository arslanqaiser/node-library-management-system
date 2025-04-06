import cron from "node-cron";
import { Borrow } from "../models/borrowModel.js";
import { sendEmail } from "../utils/sendEmail.js";

export const notifyUsers = () => {
  cron.schedule("*/30 * * * *", async () => {
    try {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const borrowers = await Borrow.find({
        dueDate: {
          $lt: oneDayAgo,
        },
        returnDate: null,
        notified: false,
      });

      for (const element of borrowers) {
        if (element.user && element.user.email) {
          sendEmail({
            email: element.user.email,
            subject: "Book Return Reminder",
            message: `Hello ${element.user.name},\n\nThis is a reminder that the book you borrowed is due for today. Please return the book to the library as soon as possible.\n\nThank You`,
          });
          element.notified = true;
          element.save();
        }
      }
    } catch (error) {
      console.error("Some error occured while notified users");
    }
  });
};
