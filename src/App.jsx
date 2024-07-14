import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomerTable from './Component/CustomerTable';
import TransactionGraph from './Component/TransactionGraph';

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const customerResponse = await axios.get('https://mennafared.github.io/api/db.json');
      setCustomers(customerResponse.data.customers);
      setTransactions(customerResponse.data.transactions);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="container mx-auto">
        <div className=' '>
          <h1 className=' font-bold text-2xl text-center pt-4'>Customer Transactions</h1>
        </div>
        <div className='flex justify-center flex-col mt-5'>
          <CustomerTable
            customers={customers}
            transactions={transactions}
            onCustomerSelect={setSelectedCustomer}
            selectedCustomer={selectedCustomer}
          />
          {selectedCustomer && (
            <TransactionGraph
              transactions={transactions.filter(t => t.customer_id === selectedCustomer.id)}
              selectedCustomer={selectedCustomer}
            />
          )}
        </div>
      </div>
    </>

  );
};

export default App;