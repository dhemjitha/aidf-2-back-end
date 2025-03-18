import Booking from "../infrastructure/schemas/Booking";
import { Request, Response, NextFunction } from "express";
import ValidationError from "../domain/errors/validation-error";
import { CreateBookingDTO } from "../domain/dtos/booking";
import { clerkClient } from "@clerk/express";

export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const booking = CreateBookingDTO.safeParse(req.body);
        console.log(booking);

        if (!booking.success) {
            throw new ValidationError(booking.error.message)
        }
        
        //@ts-ignore
        const user = req.auth;

        await Booking.create({
            hotelId: booking.data.hotelId,
            userId: user.userId,
            checkIn: booking.data.checkIn,
            checkOut: booking.data.checkOut,
            roomNumber: booking.data.roomNumber,
        });


        res.status(201).send();
        return;
    } catch (error) {
        next(error);
    }
}

export const getAllBookingsForHotel = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hotelId = req.params.hotelId;
        const bookings = await Booking.find({ hotelId: hotelId });
        const bookingsWithUser = await Promise.all(bookings.map(async (el) => {
            const user = await clerkClient.users.getUser(el.userId);
            return { _id: el._id, hotelId: el.hotelId, checkIn: el.checkIn, checkOut: el.checkOut, roomNumber: el.roomNumber, user: { id: user.id, firstName: user.firstName, lastName: user.lastName } }
        }))

        res.status(200).json(bookingsWithUser);
        return;
    } catch (error) {
        next(error);
    }
}

export const getAllBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
        return;
    } catch (error) {
        next(error);
    }
}