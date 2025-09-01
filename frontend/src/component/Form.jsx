import React, { useState, useEffect } from "react";
import recordBaseUrl from "../lib/axiosInstance";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { statesWithDistricts } from "../lib/statesWithDistricts";
import toast, { Toaster } from "react-hot-toast";

const Form = ({ refreshRecords, editingRecord, setEditingRecord }) => {
  const [recordData, setRecordData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    stateName: "",
    districtName: "",
    cityName: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingRecord) {
      setRecordData(editingRecord);
    }
  }, [editingRecord]);

  const validate = () => {
    const errors = {};

    const rawPhone = recordData.phone.replace(/\D/g, "");
    if (!/^\d{10}$/.test(rawPhone)) {
      errors.phone = "Phone number must be 10 digits";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recordData.email)) {
      errors.email = "Invalid email format";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const digits = value.replace(/\D/g, "").slice(0, 10);

      let formattedPhone = digits;
      if (digits.length > 6) {
        formattedPhone = `(${digits.slice(0, 3)})-${digits.slice(
          3,
          6
        )}-${digits.slice(6, 10)}`;
      } else if (digits.length > 3) {
        formattedPhone = `(${digits.slice(0, 3)})-${digits.slice(3, 6)}`;
      } else if (digits.length > 0) {
        formattedPhone = `(${digits}`;
      }

      setRecordData((prev) => ({ ...prev, phone: formattedPhone }));
    } else {
      setRecordData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      let res;
      if (editingRecord) {
        res = await recordBaseUrl.put(
          `/updaterecord/${editingRecord._id}`,
          recordData
        );
      } else {
        res = await recordBaseUrl.post("/addrecord", recordData);
      }

      if (res.data?.Success) {
        toast.success(res.data?.Message);
        resetForm();
        refreshRecords();
      } else {
        toast.error(res.data?.Message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const resetForm = () => {
    setRecordData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
      stateName: "",
      districtName: "",
      cityName: "",
      pincode: "",
    });
    setEditingRecord(null);
    setErrors({});
  };

  return (
    <div className="bg-white p-2 ">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-lg font-semibold mb-16">
        {editingRecord
          ? "Edit the single record Here"
          : "Add the single record Here"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <TextField
          label="First Name"
          name="firstName"
          value={recordData.firstName}
          onChange={handleChange}
          fullWidth
          size="small"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              "&.Mui-focused fieldset": { borderColor: "#6b7280" },
            },
            "& .MuiInputLabel-root": { color: "#6b7280" },
            "& .MuiInputLabel-root.Mui-focused": { color: "#6b7280" },
          }}
        />

        <TextField
          label="Last Name"
          name="lastName"
          value={recordData.lastName}
          onChange={handleChange}
          fullWidth
          size="small"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              "&.Mui-focused fieldset": { borderColor: "#6b7280" },
            },
            "& .MuiInputLabel-root": { color: "#6b7280" },
            "& .MuiInputLabel-root.Mui-focused": { color: "#6b7280" },
          }}
        />

        <TextField
          label="Phone"
          name="phone"
          value={recordData.phone}
          onChange={handleChange}
          fullWidth
          size="small"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              "&.Mui-focused fieldset": { borderColor: "#6b7280" },
            },
            "& .MuiInputLabel-root": { color: "#6b7280" },
            "& .MuiInputLabel-root.Mui-focused": { color: "#6b7280" },
          }}
        />
        {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}

        <TextField
          label="Email"
          name="email"
          value={recordData.email}
          onChange={handleChange}
          fullWidth
          size="small"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              "&.Mui-focused fieldset": { borderColor: "#6b7280" },
            },
            "& .MuiInputLabel-root": { color: "#6b7280" },
            "& .MuiInputLabel-root.Mui-focused": { color: "#6b7280" },
          }}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

        <TextField
          label="Address"
          name="address"
          value={recordData.address}
          onChange={handleChange}
          fullWidth
          size="small"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              "&.Mui-focused fieldset": { borderColor: "#6b7280" },
            },
            "& .MuiInputLabel-root": { color: "#6b7280" },
            "& .MuiInputLabel-root.Mui-focused": { color: "#6b7280" },
          }}
        />

        <div className="grid grid-cols-2 gap-3">
          <FormControl
            fullWidth
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#6b7280",
                },
              },
            }}
          >
            {" "}
            <InputLabel
              id="state-label"
              sx={{ color: "#6b7280", "&.Mui-focused": { color: "#6b7280" } }}
            >
              {" "}
              State{" "}
            </InputLabel>{" "}
            <Select
              labelId="state-label"
              name="stateName"
              value={recordData.stateName}
              onChange={(e) => {
                handleChange(e);
                setRecordData((prev) => ({ ...prev, districtName: "" }));
              }}
              label="State"
            >
              {" "}
              {Object.keys(statesWithDistricts).map((state) => (
                <MenuItem key={state} value={state}>
                  {" "}
                  {state.charAt(0).toUpperCase() + state.slice(1)}{" "}
                </MenuItem>
              ))}{" "}
            </Select>{" "}
          </FormControl>{" "}
          <FormControl
            fullWidth
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#6b7280",
                },
              },
            }}
          >
            {" "}
            <InputLabel
              id="district-label"
              sx={{ color: "#6b7280", "&.Mui-focused": { color: "#6b7280" } }}
            >
              {" "}
              District{" "}
            </InputLabel>{" "}
            <Select
              labelId="district-label"
              name="districtName"
              value={recordData.districtName}
              onChange={handleChange}
              disabled={!recordData.stateName}
              label="District"
            >
              {" "}
              {(statesWithDistricts[recordData.stateName] || []).map(
                (district) => (
                  <MenuItem key={district} value={district}>
                    {" "}
                    {district}{" "}
                  </MenuItem>
                )
              )}{" "}
            </Select>{" "}
          </FormControl>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <TextField
            label="City"
            name="cityName"
            value={recordData.cityName}
            onChange={handleChange}
            fullWidth
            size="small"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "&.Mui-focused fieldset": { borderColor: "#6b7280" },
              },
              "& .MuiInputLabel-root": { color: "#6b7280" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#6b7280" },
            }}
          />
          <TextField
            label="Zip Code"
            name="pincode"
            value={recordData.pincode}
            onChange={handleChange}
            fullWidth
            size="small"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "&.Mui-focused fieldset": { borderColor: "#6b7280" },
              },
              "& .MuiInputLabel-root": { color: "#6b7280" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#6b7280" },
            }}
          />
        </div>

        <div className="flex justify-start gap-3 mt-4">
          <Button variant="outlined" color="primary" onClick={resetForm}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            {editingRecord ? "Update" : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
