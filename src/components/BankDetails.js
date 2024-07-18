import React, { useContext, useEffect, useState } from "react";
import bankContext from "../context/bank/bankContext";
import AddBank from "./AddBank";
import EditBankForm from "./EditBankForm";
import { useNavigate } from "react-router-dom";

function BankDetails(props) {
  let navigate = useNavigate();
  const context = useContext(bankContext);
  const { bank, deleteBank, fetchBank, updateBank } = context;

  const [editBank, setEditBank] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Debug log
    if (token) {
      fetchBank();
    } else {
      console.log("No token found, redirecting to login"); // Debug log
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []); // Empty dependency array to run only once on mount

  const handleEditClick = (bank) => {
    setEditBank(bank);
  };

  const handleUpdate = async (updatedBank) => {
    await updateBank(
      updatedBank._id,
      updatedBank.accountno,
      updatedBank.bankname,
      updatedBank.ifsccode,
      updatedBank.branch
    );
    setEditBank(null); // Reset edit state
    props.showAlert("Updated Successfully", "success");
  };

  return (
    <div className="container my-3">
      {!editBank && (
        <>
          {Array.isArray(bank) && bank.length === 0 && (
            <AddBank showAlert={props.showAlert} />
          )}
          {Array.isArray(bank) && bank.length > 0 ? (
            <ul>
              <h2>Your Bank Details</h2>
              {bank.map((banks, index) => (
                <li key={index}>
                  {banks.accountno}{" "}
                  <button
                    type="button"
                    className="btn btn-danger mx-1"
                    onClick={() => {
                      deleteBank(banks._id);
                      props.showAlert("Deleted Successfully", "success");
                    }}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="btn btn-success mx-1"
                    onClick={() => handleEditClick(banks)}
                  >
                    Edit
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No bank details available.</p>
          )}
        </>
      )}

      {editBank && (
        <EditBankForm
          bank={editBank}
          handleUpdate={handleUpdate}
          showAlert={props.showAlert}
        />
      )}
    </div>
  );
}

export default BankDetails;
