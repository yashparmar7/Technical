import express from "express";
import {
  handleRecordAddController,
  handleRecordListController,
  handleRecordUpdateController,
  handleRecordDeleteController,
} from "../controller/recordController.js";

const router = express.Router();

router.post("/addrecord", handleRecordAddController);
router.get("/listsrecord", handleRecordListController);
router.put("/updaterecord/:id", handleRecordUpdateController);
router.delete("/deleterecord/:id", handleRecordDeleteController);

export default router;
