import './App.css';
import customer_data from './assets/customers.json'
import { useState } from 'react';

function App() {

  let [customers, setCustomers] = useState(customer_data);
  let formData = useState({ "name": "", "email": "", "password": "" });
  let [isEditing, setIsEditing] = useState(false);
  let [currentIndex, setCurrentIndex] = useState(null);

  const handleInputChange = function (event) {
    console.log("in handleInputChange()");
  }

  const handleListClick = function(index){
    setIsEditing(true);
    setCurrentIndex(index);
    console.log("in handleListClick()");
  }

  let onCancelClick = function () {
    console.log("in onCancelClick()");
  }

  let onDeleteClick = function () {
    console.log("in onDeleteClick()");
  }

  let onSaveClick = function () {
    console.log("in onSaveClick()");
  }


  return (
    <div className="App">
      <div className='customer-list'>
        <h2>Customer List</h2>
        <table id='customer-list'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) =>  (
              <tr key={index} onClick={() => handleListClick(index)}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='customer-form'>
        <h2>{isEditing ? 'Update' : 'Add'}</h2>
        <form>
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
                  {isEditing && <input type="button" value="Delete" onClick={onDeleteClick}/>}
                  <input type="button" value="Save" onClick={onSaveClick} />
                  <input type="button" value="Cancel" onClick={onCancelClick} />
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
