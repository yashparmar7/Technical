import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
import Navbar from "./Navbar";
import recordBaseUrl from "../lib/axiosInstance";

const Dashboard = () => {
  const [recordList, setRecordList] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);

  const getAllRecordList = async () => {
    try {
      const res = await recordBaseUrl.get("/listsrecord");
      setRecordList(res.data?.RecordList || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllRecordList();
  }, []);

  const handleUpdate = (rowData) => {
    setEditingRecord(rowData);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="container w-[95%] mx-auto mt-10 flex gap-6 px-6 py-6 bg-white shadow-md border-b border-gray-300 rounded-2xl">
        <div className="w-1/2">
          <Form
            refreshRecords={getAllRecordList}
            editingRecord={editingRecord}
            setEditingRecord={setEditingRecord}
          />
        </div>

        <div className="w-2/3">
          <Table recordList={recordList} handleUpdate={handleUpdate} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
