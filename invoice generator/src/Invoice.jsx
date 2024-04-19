import React, { useState } from "react";
//import './Invoice.css'
const InvoiceGenerator = () => {
  const [items, setItems] = useState([
    {
      itemName: "",
      rate: "",
      quantity: "",
      amount: "",
    },
  ]);

  const addItem = () => {
    setItems([
      ...items,
      {
        itemName: "",
        rate: "",
        quantity: "",
        amount: "",
      },
    ]);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...items];
    newItems[index][name] = value;

    if (name === "rate" || name === "quantity") {
      const rate = parseFloat(newItems[index]["rate"]);
      const quantity = parseInt(newItems[index]["quantity"]);
      newItems[index]["amount"] = isNaN(rate) || isNaN(quantity) ? "" : rate * quantity;
    }

    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const amount = parseFloat(item.amount);
      return isNaN(amount) ? total : total + amount;
    }, 0);
  };

  return (
    <>
     <div className="container">
      <div className="row justify-content-center">
        <div className="col-8 row mt-4">
          <div className="border">
      <h1>Invoice Generator</h1>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Rate</th>
            <th>Quantity</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  name="itemName"
                  value={item.itemName}
                  onChange={(e) => handleInputChange(index, e)} className="text-center align-middle form-control border-0"
                />
              </td>
              <td>
                <input
                  type="number"
                  name="rate"
                  value={item.rate}
                  onChange={(e) => handleInputChange(index, e)} className="text-center align-middle form-control border-0"
                />
              </td>
              <td>
                <input
                  type="number"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => handleInputChange(index, e)} className="text-center align-middle form-control border-0"
                />
              </td>
              <td>
                <input
                  type="number"
                  name="amount"
                  value={item.amount}
                  readOnly className="form-control border-0"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addItem}>Add Line</button>
      <div>
        <strong>Total Amount:</strong> {calculateTotal()}
         
      </div>
    </div>
    </div>
    </div>
    </div>
    </>
  );
};

export default InvoiceGenerator;


