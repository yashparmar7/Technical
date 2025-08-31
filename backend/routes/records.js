import express from "express";
import {
  handleRecordAddController,
  handleRecordListController,
  handleRecordUpdateController,
} from "../controller/recordController.js";

const router = express.Router();

router.post("/addrecord", handleRecordAddController);
router.get("/listsrecord", handleRecordListController);
router.put("/updaterecord/:id", handleRecordUpdateController);

export default router;
