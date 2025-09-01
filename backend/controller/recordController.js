import { Record } from "../model/Record.js";

export const handleRecordAddController = async (req, res) => {
  try {
    const body = req.body;

    if (
      !body.firstName ||
      !body.lastName ||
      !body.phone ||
      !body.email ||
      !body.address ||
      !body.stateName ||
      !body.districtName ||
      !body.cityName ||
      !body.pincode
    ) {
      return res
        .status(400)
        .json({ Success: false, Message: "All fields are required" });
    }

    const recordAdd = new Record({
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      email: body.email,
      address: body.address,
      stateName: body.stateName,
      districtName: body.districtName,
      cityName: body.cityName,
      pincode: body.pincode,
    });

    await recordAdd.save();
    return res.status(200).json({
      Success: true,
      Message: "Record Inserted Successfully",
      Id: recordAdd._id,
    });
  } catch (error) {
    return res.status(500).json({ Success: false, Message: error.message });
  }
};

export const handleRecordListController = async (req, res) => {
  try {
    const recordList = await Record.find({});
    return res.status(200).json({
      Success: true,
      Message: " All Records fetched successfully ",
      Count: recordList.length,
      RecordList: recordList,
    });
  } catch (error) {
    return res.status(500).json({ Success: false, Message: error.message });
  }
};

export const handleRecordUpdateController = async (req, res) => {
  try {
    const body = req.body;

    const updating = await Record.updateOne({ _id: body?._id }, { $set: body });

    if (updating?.acknowledged) {
      return res
        .status(200)
        .json({ Success: true, Message: "Record Updated Successfully " });
    }
  } catch (error) {
    return res.status(500).json({ Success: false, Message: error.message });
  }
};
