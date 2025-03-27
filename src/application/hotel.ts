import Hotel from "../infrastructure/schemas/Hotel";
import { Request, Response, NextFunction } from "express";
import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";
import { CreateHotelDTO } from "../domain/dtos/hotel";
import OpenAI from "openai";

export const getAllHotels = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
        return;
    } catch (error) {
        next(error);
    }
};

export const getHotelById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hotelId = req.params.id;
        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            throw new NotFoundError("Hotel not found");
        }
        res.status(200).json(hotel);
        return;
    } catch (error) {
        next(error);
    }
}

export const generateResponse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { prompt } = req.body;
  
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        // {
        //   role: "system",
        //   content:
        //     "You are assistant that will categorize the words that a user gives and give them labels and show an output. Return this response as in the following examples: user: Lake, Cat, Dog, Tree; response: [{label:Nature, words:['Lake', 'Tree']}, {label:Animals, words:['Cat', 'Dog']}] ",
        // },
        { role: "user", content: prompt },
      ],
      store: true,
    });
  
    res.status(200).json({
      message: {
        role: "assistant",
        content: completion.choices[0].message.content,
      },
    });
    return;
  };

export const createHotel = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hotel = CreateHotelDTO.safeParse(req.body);

        if (!hotel.success) {
            throw new ValidationError(hotel.error.message);
        }

        await Hotel.create({
            name: hotel.data.name,
            location: hotel.data.location,
            image: hotel.data.image,
            price: parseInt(hotel.data.price),
            description: hotel.data.description,
        });

        res.status(201).send();
        return;
    } catch (error) {
        next(error);
    }
}

export const deleteHotel = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hotelId = req.params.id;
        await Hotel.findByIdAndDelete(hotelId);
        res.status(200).send();
        return;
    } catch (error) {
        next(error);
    }
}

export const updateHotel = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hotelId = req.params.id;
        const updatedHotel = req.body;

        if (
            !updatedHotel.name ||
            !updatedHotel.location ||
            !updatedHotel.rating ||
            !updatedHotel.reviews ||
            !updatedHotel.image ||
            !updatedHotel.price ||
            !updatedHotel.description
        ) {
            throw new ValidationError("Invalid hotel data");
        }

        await Hotel.findByIdAndUpdate(hotelId, updatedHotel);

        res.status(200).send();
        return;
    } catch (error) {
        next(error);
    }
}