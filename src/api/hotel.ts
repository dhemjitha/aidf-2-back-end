import express from "express";
import { getAllHotels, getHotelById, createHotel, deleteHotel, updateHotel, generateResponse } from "../application/hotel";
import { isAuthenticated } from "./middleware/authentication-middleware";
import { isAdmin } from "./middleware/authorization-middleware";
import { createEmbeddings } from "../application/embedding";
import { retrieve } from "../application/retrieve";


const hotelRouter = express.Router();

// hotelRouter.get("/", getAllHotels);
// hotelRouter.get("/:id", getHotelById);
// hotelRouter.post("/", createHotel);
// hotelRouter.delete("/:id", deleteHotel);
// hotelRouter.put("/:id", updateHotel);

hotelRouter.route("/").get(getAllHotels).post(isAuthenticated, isAdmin, createHotel);
hotelRouter.route("/:id").get(getHotelById).put(updateHotel).delete(isAuthenticated, isAdmin, deleteHotel);
hotelRouter.route("/embeddings/create").post(createEmbeddings);
hotelRouter.route("/search/retrieve").get(retrieve);

export default hotelRouter;