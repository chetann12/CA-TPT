import React, { useState } from "react";

function EditBankForm({ bank, handleUpdate }) {
  const [updatedBank, setUpdatedBank] = useState(bank);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBank({ ...updatedBank, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(updatedBank);
    // props.showAlert("Updated Successfully", "success");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="accountno">Account No</label>
        <input
          type="text"
          className="form-control"
          id="accountno"
          name="accountno"
          value={updatedBank.accountno}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="bankname">Bank Name</label>
        <input
          type="text"
          className="form-control"
          id="bankname"
          name="bankname"
          value={updatedBank.bankname}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="ifsccode">IFSC Code</label>
        <input
          type="text"
          className="form-control"
          id="ifsccode"
          name="ifsccode"
          value={updatedBank.ifsccode}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="branch">Branch</label>
        <input
          type="text"
          className="form-control"
          id="branch"
          name="branch"
          value={updatedBank.branch}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Update
      </button>
    </form>
  );
}

export default EditBankForm;
