const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const razorpay = require("razorpay");

const addAppointment = async (req, res) => {
  try {
    const userId = req.id;
    const { slotDate, slotTime, docId } = req.body;
    if (!userId || !slotDate || !slotTime || !docId)
      return res.status(401).json({ msg: "All fields are required!" });
    const doctor = await Doctor.findById(docId);
    if (!doctor) return res.status(404).json({ msg: "Doctor not found!" });
    const slotBookings = doctor.slotBookings;

    const isSlotExisted = slotBookings.find(
      (eachBooking) =>
        eachBooking.date.toLocaleDateString() ===
          new Date(slotDate).toLocaleDateString() &&
        eachBooking.time === slotTime
    );

    if (isSlotExisted)
      return res.status(409).json({ msg: "No slot available" });

    const newSlot = new Appointment({
      userId,
      docId,
      slotDate,
      slotTime,
      amount: doctor.fees,
    });

    await newSlot.save();

    slotBookings.push({
      date: slotDate,
      time: slotTime,
    });
    await doctor.save();

    return res.status(201).json({ msg: "New slot booked successfully!" });
  } catch (err) {
    console.log("Error at adding appointment ", err);
    return res.status(500).json({ msg: "Server error" });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const appointmentId = req.body.id;
    if (!appointmentId)
      return res.status(404).json({ msg: "Appointment Id not found!" });
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment)
      return res.status(404).json({ msg: "Appointment not found!" });

    appointment.cancelled = true;
    await appointment.save();

    const doctor = await Doctor.findByIdAndUpdate(
      appointment.docId,
      {
        $pull: {
          slotBookings: {
            date: appointment.slotDate,
            time: appointment.slotTime,
          },
        },
      },
      { new: true }
    );

    return res.status(200).json({ msg: "Appointment cancelled successfully!" });
  } catch (err) {
    console.log("Error at deleting appointment ", err);
    return res.status(500).json({ msg: "Server error" });
  }
};

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

const createOrder = async (req, res) => {
  try {
    const appointmentId = req.body.appointmentId;
    const appointment = await Appointment.findById(appointmentId);

    if (!appointmentId || appointment.cancelled)
      return res.status(401).json({ msg: "Enter valid appointment" });
    const options = {
      amount: appointment.amount * 100,
      currency: "INR",
      receipt: appointmentId,
    };
    const order = await razorpayInstance.orders.create(options);
    return res.status(201).json({ msg: "Order created successfully!", order });
  } catch (err) {
    console.log("Error at creating order ", err);
    return res.status(500).json({ msg: "Server error" });
  }
};

const verifyOrder = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderDetails = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (!razorpay_order_id || !orderDetails)
      return res.status(403).json({ msg: "Order id is missing" });

    if (orderDetails.status !== "paid")
      return res.status(403).json({ msg: "Payment is unsuccessfull" });

    const appointment = await Appointment.findByIdAndUpdate(
      orderDetails.receipt,
      { payment: true }
    );

    if (!appointment)
      return res.status(404).json({ msg: "Appointment not found!" });

    return res.status(200).json({ msg: "Payment is successfull" });
  } catch (err) {
    console.log("Error at verifying order ", err);
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { addAppointment, cancelAppointment, createOrder,verifyOrder };
