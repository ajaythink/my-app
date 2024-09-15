import axios from "axios";
import { useEffect, useState } from "react";

function Student() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [customers, setUsers] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get(
      "https://springbootreactapp-production.up.railway.app/api/getall"
    );
    setUsers(result.data);
    console.log(result.data);
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://springbootreactapp-production.up.railway.app/api/save", {
        name: name,
        address: address,
        mobile: mobile,
      });
      alert("Customer Registation Successfully");
      setId("");
      setName("");
      setAddress("");
      setMobile("");
      Load();
    } catch (err) {
      alert("User Registation Failed");
    }
  }

  async function editCustomer(customers) {
    setName(customers.name);
    setAddress(customers.address);
    setMobile(customers.mobile);
    setId(customers.id);
  }

  async function DeleteCustomer(customerid) {
    await axios.delete(
      "https://springbootreactapp-production.up.railway.app/api/delete/" + customerid
    );
    alert("Employee deleted Successfully");
    Load();
  }

  async function update(event) {
    event.preventDefault();

    try {
      await axios.put("https://springbootreactapp-production.up.railway.app/api/edit/"+id, {
        id: id,
        name: name,
        address: address,
        mobile: mobile,
      });
      alert("Registation Updateddddd");
      setId("");
      setName("");
      setAddress("");
      setMobile("");
      Load();
    } catch (err) {
      alert("User Registation Failed");
    }
  }
  // {
  //   "name": "Anirudh ",
  //   "address": "Buxar",
  //   "mobile": "9876543201"
  // }
  return (
    <div>
      <h1>Student Details</h1>
      <div className ="container mt-4">
        <form>
          <div className ="form-group">
            <label>Student Name</label>
            <input
              type="text"
              className ="form-control"
              id="name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div className ="form-group">
            <label>Customer Address</label>
            <input
              type="text"
              className ="form-control"
              id="address"
              value={address}
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            />
          </div>

          <div className ="form-group">
            <label>Mobile</label>
            <input
              type="text"
              className ="form-control"
              id="mobile"
              value={mobile}
              onChange={(event) => {
                setMobile(event.target.value);
              }}
            />
          </div>
          <div>
            <button className ="btn btn-primary mt-4" onClick={save}>
              Register
            </button>
            <button className ="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>

      <table className ="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">Customer Id</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Customer Address</th>
            <th scope="col">Customer Mobile</th>

            <th scope="col">Option</th>
          </tr>
        </thead>
        {customers.map(function fn(customer) {
          return (
            <tbody>
              <tr>
                <th scope="row">{customer.id} </th>
                <td>{customer.name}</td>
                <td>{customer.address}</td>
                <td>{customer.mobile}</td>
                <td>
                  <button
                    type="button"
                    className ="btn btn-warning"
                    onClick={() => editCustomer(customer)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className ="btn btn-danger"
                    onClick={() => DeleteCustomer(customer.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

export default Student;
