import Booking from "../models/Booking.js";

// Create a new booking
export const createBooking = async (req, res) => {
console.log("---------------------------------========");
  const newBooking = new Booking(req.body);

  try {
    const savedBooking = await newBooking.save();
    res.status(200).json({ 
        success: true, 
        message: "Your Tour is Booked", 
        data: savedBooking
    });
  } catch (error) {
    console.error("Error while creating booking:", error);
    res.status(500).json({ 
        success: false, 
        message: "Internal Server Error",
        error: error.message // Send the error message to the client for debugging
    });
  }
};


// Get a single booking by ID
export const getBooking = async (req, res) => {
  const bookingId = req.params.id;
  console.log("------------------------------------------",bookingId);
  try {
    const booking = await Booking.find({userId: bookingId});
    if (booking.length==0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Booking retrieved successfully",
      data: booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to get booking" });
  }
};

// Delete a single booking by ID
export const deleteBooking = async (req, res) => {
  const bookingId = req.params.id;
  try {
    const booking = await Booking.findByIdAndDelete(bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
      data: booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to delete booking" });
  }
};


// Get all bookings
export const getAllBookings = async (req, res) => {
  console.log(";;;;;;;;;;;;;;;;;;;;;;;;");
  try {
    const bookings = await Booking.find();
    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: bookings,
    });
  } catch (error) {
    console.log("------------------------------------------");
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to get bookings" });
  }
};

export default {
  createBooking,
  getBooking,
  getAllBookings,
  deleteBooking
};
