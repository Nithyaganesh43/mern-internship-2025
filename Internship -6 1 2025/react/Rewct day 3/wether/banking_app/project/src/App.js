import React, { useState } from "react";

const App = () => {
  const [userDetails, setUserDetails] = useState({ name: "", accountNumber: "" });
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [transaction, setTransaction] = useState("");
  const [amount, setAmount] = useState(0);
  const [value, setValue] = useState("");
  const [showDeleteOption, setShowDeleteOption] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);

  const registerUser = (e) => {
    e.preventDefault();
    if (!userDetails.name || !userDetails.accountNumber) {
      alert("Please fill in all details!");
    } else {
      setIsUserRegistered(true);
    }
  };

  const handleTransaction = (e) => {
    e.preventDefault();
    if (!transaction) {
      alert("Select Transaction");
    } else if (transaction === "Deposit") {
      setAmount(amount + Number(value));
      alert("Transaction Successful: Amount Deposited!");
      setShowDeleteOption(true);
    } else if (transaction === "Withdraw") {
      const temp = amount - Number(value);
      if (temp < 0) {
        alert("Insufficient Balance");
      } else {
        setAmount(temp);
        alert("Transaction Successful: Amount Withdrawn!");
        setShowDeleteOption(true);
      }
    } else {
      alert("Invalid Transaction");
    }
    setValue("");
  };

  const deleteAccount = () => {
    setUserDetails({ name: "", accountNumber: "" });
    setAmount(0);
    setIsUserRegistered(false);
    setShowDeleteOption(false);
    setShowUserDetails(false);
    alert("Account Deleted Successfully!");
  };

  return (
    <div>
      <h2>BANKING APPLICATION</h2>
      {!isUserRegistered ? (
        <form onSubmit={registerUser}>
          <h3>Register User</h3>
          <label>Name:</label>
          <input
            type="text"
            value={userDetails.name}
            onChange={(e) =>
              setUserDetails({ ...userDetails, name: e.target.value })
            }
            placeholder="Enter your name"
          />
          <br />
          <label>Account Number:</label>
          <input
            type="text"
            value={userDetails.accountNumber}
            onChange={(e) =>
              setUserDetails({ ...userDetails, accountNumber: e.target.value })
            }
            placeholder="Enter account number"
          />
          <br />
          <button type="submit">Register</button>
        </form>
      ) : (
        <>
          <h3>Welcome, {userDetails.name}</h3>
          <form onSubmit={handleTransaction}>
            <label>Choose Your Transaction:</label>
            <select
              value={transaction}
              onChange={(e) => setTransaction(e.target.value)}
            >
              <option value="">Select Transaction</option>
              <option value="Deposit">Deposit</option>
              <option value="Withdraw">Withdraw</option>
            </select>
            <h2>Your Bank Balance is Rs.{amount}</h2>
            <h3>Enter The Amount</h3>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter amount"
            />
            <button type="submit">Submit</button>
          </form>
          <button onClick={() => setShowUserDetails(!showUserDetails)}>
            {showUserDetails ? "Hide User Details" : "User Details"}
          </button>
          {showUserDetails && (
            <div id="details">
              <h3>User Name: {userDetails.name}</h3>
              <h4>Account Number: {userDetails.accountNumber}</h4>
              <h4>Available Balance: {amount}</h4>
            </div>
          )}
          {showDeleteOption && (
            <div>
              <h3>Would you like to delete your account?</h3>
              <button onClick={deleteAccount}>Yes, Delete</button>
              <button
                onClick={() => alert("Thank you for banking with us!")}
              >
                No, Exit
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;

