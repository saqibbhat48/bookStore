import express from "express";
const router = express.Router();
import User from "../models/user.js";
import { authenticateToken } from "../middleware/userAuth.js";

//add favourite book to user model
router.put("/add-to-favourite", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookFavorited = userData.favourites.includes(bookid);
    if (isBookFavorited) {
      return res.json({
        status: "Success",
        message: "Book is already in favourites",
      });
    }
    await User.findByIdAndUpdate(id, {
      $push: { favourites: bookid },
    });

    return res.json({
      status: "Success",
      message: "Book added to favourites",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

//get Favourite books of a particular user
router.get("/get-favourite-books", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("favourites");
    const favouriteBooks = userData.favourites;
    return res.json({
      status: "Success",
      data: favouriteBooks,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

//remove from favourites
router.put("/remove-from-favourite", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    await User.findByIdAndUpdate(id, {
      $pull: { favourites: bookid },
    });

    return res.json({
      status: "Success",
      message: "Book removed from favourites",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});
export default router;
