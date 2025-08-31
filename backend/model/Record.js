import mongoose from "mongoose";

const recordSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v.replace(/\D/g, ""));
        },
        message: "Phone number must be 10 digits",
      },
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Invalid email format",
      },
    },
    address: { type: String, required: true },
    stateName: { type: String, required: true },
    districtName: { type: String, required: true },
    cityName: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  { timestamps: true }
);

recordSchema.pre("save", function (next) {
  if (this.phone) {
    const digits = this.phone.replace(/\D/g, "");
    this.phone = `(${digits.slice(0, 3)})-${digits.slice(3, 6)}-${digits.slice(
      6,
      10
    )}`;
  }
  next();
});

export const Record = mongoose.model("Record", recordSchema);
