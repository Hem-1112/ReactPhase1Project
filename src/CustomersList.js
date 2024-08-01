export function CustomersList ({customers, currentIndex, handleListClick}) {
    return (
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
    );
}