import React, { useContext, useState } from "react";
import bankContext from "../context/bank/bankContext";

const AddBank = (props) => {
  const context = useContext(bankContext);

  const { addBank } = context;

  const [bank, setbank] = useState({
    accountno: "",
    bankname: "",
    ifsccode: "",
    branch: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addBank(bank.accountno, bank.bankname, bank.ifsccode, bank.branch);
    props.showAlert("Bank Details Added Successfully", "success");
  };

  const onChange = (e) => {
    setbank({ ...bank, [e.target.name]: e.target.value });
  };
  return (
    <>
      <h2>Add Bank Details</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Account number
          </label>
          <input
            type="text"
            className="form-control"
            id="accountno"
            name="accountno"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Bank Name
          </label>
          <input
            type="text"
            className="form-control"
            id="bankname"
            name="bankname"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Ifsc code
          </label>
          <input
            type="text"
            className="form-control"
            id="ifsccode"
            name="ifsccode"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Branch Name
          </label>
          <input
            type="text"
            className="form-control"
            id="branch"
            name="branch"
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Submit
        </button>
      </form>
    </>
  );
};

export default AddBank;
