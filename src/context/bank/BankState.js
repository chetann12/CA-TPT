import bankContext from "./bankContext";
import React, { useState } from "react";

const BankState = (props) => {
  const host = "http://localhost:5000";
  const bankInitial = [];

  const [bank, setbank] = useState(bankInitial);

  // fetch bank details
  const fetchBank = async () => {
    const response = await fetch(`${host}/api/bank/fetchbank`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json);
    setbank(json);
  };

  //   Add  bank
  const addBank = async (accountno, bankname, ifsccode, branch) => {
    const response = await fetch(`${host}/api/bank/addbank`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ accountno, bankname, ifsccode, branch }),
    });

    // for client
    let newbank = {
      _id: "664c51f937446d6ec22f3622",
      user: "664319a179c688db6eeb5e27",
      accountno: accountno,
      bankname: bankname,
      ifsccode: ifsccode,
      branch: branch,
      date: "2024-05-21T07:49:13.879Z",
      __v: 0,
    };

    // const json = await response.json();
    // console.log(json);   //use this to check any error

    setbank(bank.concat(newbank));
  };
  //  Delete bank
  const deleteBank = async (id) => {
    const response = await fetch(`${host}/api/bank/deletebank/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    // console.log("Deleted" + id);
    const newBank = bank.filter((banks) => {
      return banks._id !== id;
    });
    setbank(newBank);
  };

  // Update bank
  const updateBank = async (id, accountno, bankname, ifsccode, branch) => {
    const response = await fetch(`${host}/api/bank/updatebank/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ accountno, bankname, ifsccode, branch }),
    });
    // const updatedBank = await response.json();

    // setbank((prevBanks) =>
    //   prevBanks.map((bank) => (bank._id === id ? updatedBank : bank))
    // );
    let updateBank = JSON.parse(JSON.stringify(bank));
    for (let index = 0; index < updateBank.length; index++) {
      const element = updateBank[index];
      if (element._id === id) {
        updateBank[index].accountno = accountno;
        updateBank[index].bankname = bankname;
        updateBank[index].ifsccode = ifsccode;
        updateBank[index].branch = branch;
        break;
      }
    }
    setbank(updateBank);
  };

  return (
    <bankContext.Provider
      value={{ bank, setbank, addBank, deleteBank, updateBank, fetchBank }}
    >
      {props.children}
    </bankContext.Provider>
  );
};

export default BankState;
