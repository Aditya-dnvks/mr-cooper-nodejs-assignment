import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Home = () => {
  const [visitors, setVisitors] = useState([]);

  const token = JSON.parse(localStorage.getItem("token"));

  let decodedToken;
  if (token) {
    decodedToken = jwtDecode(token);
    console.log(decodedToken.flat);
  }

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    try {
      const response = await axios.get("http://localhost:3000/visitors", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVisitors(response.data);
    } catch (err) {
      console.log("Failed to fetch visitors. Check authentication.");
    }
  };

  const updateVisitorStatus = async (id, status) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.put(
        `http://localhost:3000/visitors/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(response.data.message);

      fetchVisitors();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="p-3 m-3 ">
      <div className="flex gap-6">
        <img
          src="https://img.freepik.com/free-vector/invoice-concept-illustration_114360-2322.jpg"
          className="w-[30%]"
        />
        <table className="border border-gray-300 shadow-lg w-[65%]">
          <caption className="font-bold text-3xl text-center m-3">
            Your Visitors {token && `(Flat No: ${decodedToken.flat})`}
          </caption>
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-center">
                S.No
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Visitor Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Visitor Purpose
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Visitor Time
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Status
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Approve
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Reject
              </th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((visitor, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-100 h-fit">
                <td className="border border-gray-300 px-4 text-center h-fit">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 text-center h-fit">
                  {visitor.visitorName}
                </td>
                <td className="border border-gray-300 px-4 text-center h-fit">
                  {visitor.visitorPurpose}
                </td>
                <td className="border border-gray-300 px-4 text-center h-fit">
                  {visitor.visitorTime}
                </td>
                <td className="border border-gray-300 px-4 text-center h-fit">
                  {visitor.status}
                </td>
                <td className="border border-gray-300 px-4 text-center h-fit">
                  {visitor.status === "Pending" ? (
                    <button
                      className="p-2 bg-green-500 text-sm text-white my-2 rounded-lg"
                      onClick={() =>
                        updateVisitorStatus(visitor._id, "Approved")
                      }
                    >
                      Approve
                    </button>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {visitor.status === "Pending" ? (
                    <button
                      className="p-2 bg-red-400 text-sm text-white my-2 rounded-lg"
                      onClick={() =>
                        updateVisitorStatus(visitor._id, "Rejected")
                      }
                    >
                      Reject
                    </button>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
