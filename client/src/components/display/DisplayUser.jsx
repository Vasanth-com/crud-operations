import React, { useContext, useEffect } from "react";
// import { StoreContext } from "../../context/StoreContext";
import { StoreContext } from "../../context/ApiContext";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import axios from "axios";
const DisplayUser = () => {
  const { employeeData, setEmployeeData,admin } = useContext(StoreContext);
  const token = admin?.token
  console.log(employeeData);
  const handleOnDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(
            `http://localhost:4000/api/employee/delete/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            }
          );
            Swal.fire({
              title: "Deleted!",
              text: "Employee has been deleted.",
              icon: "success",
            });

        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: error.response?.data?.message || "Failed to delete the employee",
            icon: "error",
          });
        }
      }
    });
  };
  return (
    <div className="container">
      <h2> Employee Details </h2>
      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1">Job Id</div>
          <div className="col col-2">Name</div>
          <div className="col col-3">Email</div>
          <div className="col col-4">City</div>
          <div className="col col-5">Salary</div>
        </li>
        {employeeData.length > 0 &&
          employeeData.map((item, idx) => {
            return (
              <div key={idx}>
                <Link className="edit__btn" to={`/edit/${item._id}`}>
                  Edit <span>→</span>
                </Link>
                <Link
                  className="link__btn"
                  onClick={() => handleOnDelete(item._id)}
                >
                  <li className="table-row">
                    <div className="col col-1">{item.jobId}</div>
                    <div className="col col-2">{item.name}</div>
                    <div className="col col-3">{item.email}</div>
                    <div className="col col-4">{item.city}</div>
                    <div className="col col-5">{item.salary}</div>
                  </li>
                </Link>
              </div>
            );
          })}
      </ul>
    </div>
  );
};

export default DisplayUser;
