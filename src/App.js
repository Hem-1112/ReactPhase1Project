import './App.css';
import customer_data from './assets/customers.json';
import { CustomersList } from './CustomersList';
import { CustomerAddUpdateForm } from './CustomerAddUpdateForm';
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
    setCurrentIndex(null)
  }

  return (
    <div className="App">
      
      <CustomersList 
        customers={customers} currentIndex={currentIndex} handleListClick={handleListClick}>
      </CustomersList>

      <CustomerAddUpdateForm
        formData={formData}
        handleInputChange={handleInputChange}
        isEditing={isEditing}
        onSaveClick={onSaveClick}
        onDeleteClick={onDeleteClick}
        onCancelClick={onCancelClick}>
      </CustomerAddUpdateForm>
    </div>
  );
}

export default App;