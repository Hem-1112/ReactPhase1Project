import './App.css';
import customer_data from './assets/customers.json'
import { useState } from 'react';

function App() {

  let blankCustomer = {"name": "", "email": "", "password": "" };
  let [customers, setCustomers] = useState(customer_data);
  let [formData, setFormData] = useState(blankCustomer);
  let [isEditing, setIsEditing] = useState(false);
  let [currentIndex, setCurrentIndex] = useState(null);

  const handleInputChange = function(e) {
    console.log("in handleInputChange()");
    let {name, value} = e.target;
    setFormData({...formData, [name] : value});
  }

  const handleListClick = function(index){
    console.log("in handleListClick()");
    if(currentIndex === index) {
      setFormData(blankCustomer);
      setIsEditing(false);
      setCurrentIndex(null);
    } else {
      setFormData(customers[index]);
      setIsEditing(true);
      setCurrentIndex(index);
    }
  }

  let onCancelClick = function () {
    setFormData(blankCustomer);
    setIsEditing(false);
    setCurrentIndex(null);
    console.log("in onCancelClick()");
  }

  let onDeleteClick = function () {
    console.log("in onDeleteClick()");
    if(isEditing) {
      let updatedCustomer = customers.filter((_, index) => index !== currentIndex);
      setCustomers(updatedCustomer);
      setFormData(blankCustomer);
      setIsEditing(false);
      setCurrentIndex(null);
    }
  }

   let onSaveClick = function (e) {
    console.log("in onSaveClick()");
    e.preventDefault();
    if(isEditing) {
      let updatedCustomer = customers.map((customer, index) =>
        index === currentIndex ? formData : customer);
      setCustomers(updatedCustomer);
    } else {
      setCustomers([...customers, formData]);
    }
    setFormData(blankCustomer);
    setIsEditing(false);
  }

  return (
    <div className="App">
      <div className='customer-list'>
        <h2>CUSTOMERS</h2>
        <table class='customers-list' id='customer-list'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) =>  (
              <tr key={index} onClick={() => handleListClick(index)} className={ (currentIndex === index) ? 'selected': ''}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='customer-form'>
        <h2>{isEditing ? 'UPDATE' : 'ADD'}</h2>
        <form onSubmit={onSaveClick}>
          <table>
            <tbody>
              <tr>
                <td><label>Name : </label></td>
                <td><input
                 type='text'
                 name='name'
                 id='name'
                 value={formData.name}
                 onChange={handleInputChange}
                 required /></td>
              </tr>

              <tr>
                <td><label>Email : </label></td>
                <td><input
                 type='email'
                 name='email'
                 id='email'
                 value={formData.email}
                 onChange={handleInputChange}
                 required /></td>
              </tr>

              <tr>
                <td><label>Password : </label></td>
                <td><input
                 type='text'
                 name='password'
                 id='password'
                 value={formData.password}
                 onChange={handleInputChange}
                 required /></td>
              </tr>

              <tr className="button-bar">
                <td colSpan="2">
                  <button type="button" onClick={onDeleteClick} class="style-button">Delete</button>
                  <button type="submit" class="style-button">Save</button>
                  <button type="button" onClick={onCancelClick} class="style-button">Cancel</button>
                </td>
            </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}

export default App;
