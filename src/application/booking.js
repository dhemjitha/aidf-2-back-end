import Booking from "../infrastructure/schemas/Booking.js";

export const createBooking = async (req, res) => {
    const booking = req.body;

    if (!booking.hotelId || !booking.userId || !booking.checkIn || !booking.checkOut || !booking.roomNumber) {
        res.status(400).send();
        return;
    }

    await Booking.create({
        hotelId: booking.hotelId,
        userId: booking.userId,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        roomNumber: booking.roomNumber
    });
    res.status(201).send();
    return;

}

export const getAllBookingsForHotel = async (req, res) => {
    const hotelId = req.params.hotelId;
    const bookings = await Booking.find({ hotelId: hotelId}).populate("userId");
    res.status(200).json(bookings);
    return;
}

export const getAllBookings = async (req, res) => {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
    return;
}