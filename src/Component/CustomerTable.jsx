import React, { useState } from 'react';

const CustomerTable = ({ customers, transactions, onCustomerSelect, selectedCustomer }) => {
  const [nameFilter, setNameFilter] = useState('');
  const [amountFilter, setAmountFilter] = useState('');

  const filteredCustomers = customers.filter(customer => {
    const matchesName = customer.name.toLowerCase().includes(nameFilter.toLowerCase());
    const matchesAmount = transactions
      .filter(transaction => transaction.customer_id === customer.id)
      .some(transaction => transaction.amount.toString().includes(amountFilter));

    return matchesName && matchesAmount;
  });

  const getCustomerTransactions = (customerId) => {
    return transactions
      .filter(transaction => transaction.customer_id === customerId)
      .filter(transaction => transaction.amount.toString().includes(amountFilter));
  };

  return (
    <>
      <div className=''>
        <div className="relative">
          <input
            type="text"
            placeholder="Filter by customer name..."
            value={nameFilter}
            id="customer"
            onChange={(e) => setNameFilter(e.target.value)}
            className="rounded block p-3 w-full text-base bg-transparent border-0 border-b border-sky-400 appearance-none focus:outline-none focus:ring-0 focus:border-sky-400 peer"
          />
          <label htmlFor="customer" className="absolute text-base text-gray-700 ps-3 duration-300 transform -translate-y-6 top-3 origin-[0] peer-focus:start-0 peer-focus:text-sky-500 border-sky-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 ">Filter by customer name</label>
        </div>
        <div className="relative mt-5">
          <input
            type="text"
            placeholder="Filter by transaction amount..."
            value={amountFilter}
            id='transaction'
            onChange={(e) => setAmountFilter(e.target.value)}
            className="rounded block p-3 w-full text-base bg-transparent border-0 border-b border-sky-400 appearance-none focus:outline-none focus:ring-0 focus:border-sky-400 peer"
          />
          <label htmlFor="transaction" className="absolute text-base text-gray-700 ps-3 duration-300 transform -translate-y-6 top-3 origin-[0] peer-focus:start-0 peer-focus:text-sky-500 border-sky-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 ">Filter by transaction amount</label>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full mt-5 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="text-center px-6 py-3">Customer</th>
                <th scope="col" className="text-center px-6 py-3">Transaction Date</th>
                <th scope="col" className="text-center px-6 py-3">Amount</th>
                <th scope="col" className="text-center px-6 py-3">Select</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map(customer => {
                const customerTransactions = getCustomerTransactions(customer.id);
                if (customerTransactions.length === 0) return null;
                return (
                  <tr key={customer.id} className="border-b dark:border-gray-700 odd:bg-sky-100 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 ">
                    <td className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {customer.name}
                    </td>
                    <td className="text-center px-6 py-4">
                      {customerTransactions.map(transaction => (
                        <div key={transaction.id}>
                          {transaction.date}
                        </div>
                      ))}
                    </td>
                    <td className="text-center px-6 py-4">
                      {customerTransactions.map(transaction => (
                        <div key={transaction.id}>
                          {transaction.amount}
                        </div>
                      ))}
                    </td>
                    <td className="text-center px-6 py-4">
                      <input
                        type="radio"
                        name="customer"
                        value={customer.id}
                        checked={selectedCustomer && selectedCustomer.id === customer.id}
                        onChange={() => onCustomerSelect(customer)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CustomerTable;