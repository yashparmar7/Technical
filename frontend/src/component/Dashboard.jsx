import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
import Navbar from "./Navbar";
import recordBaseUrl from "../lib/axiosInstance";
import toast, { Toaster } from "react-hot-toast";

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
  `321`;
  const handleUpdate = (rowData) => {
    setEditingRecord(rowData);
  };

  const handleDelete = (rowData) => {
    toast(
      (t) => (
        <span>
          Are you sure you want to delete{" "}
          <b>{rowData.firstName + " " + rowData.lastName}</b>?
          <div className="mt-2 flex gap-5">
            <button
              className="px-5 py-1 bg-red-500 text-white rounded-lg"
              onClick={async () => {
                try {
                  await recordBaseUrl.delete(`/deleterecord/${rowData._id}`);
                  setRecordList((prev) =>
                    prev.filter((item) => item._id !== rowData._id)
                  );
                  toast.dismiss(t.id);
                  toast.success("Record deleted successfully");
                } catch (error) {
                  console.error("Error deleting record:", error);
                  toast.dismiss(t.id);
                  toast.error("Failed to delete record ");
                }
              }}
            >
              Yes
            </button>
            <button
              className="px-3 py-1 bg-gray-300 rounded-lg"
              onClick={() => toast.dismiss(t.id)}
            >
              No
            </button>
          </div>
        </span>
      ),
      { duration: 5000 }
    );
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
          <Table
            recordList={recordList}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        </div>
      </div>

      <Toaster position="top-center" />
    </div>
  );
};

export default Dashboard;
