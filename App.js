import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [serverTime, setServerTime] = useState('');
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    setServerTime(new Date().toUTCString());
    // In production, replace with your backend service URL
    setAccounts([
      { id: 1, type: 'Checking', balance: '$4,250.00' },
      { id: 2, type: 'Savings',  balance: '$12,800.50' }
    ]);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>DevBank</h1>
        <p className="tagline">Reliable banking, powered by the cloud.</p>
        <p className="timestamp">Server time: {serverTime}</p>
        <div className="accounts">
          {accounts.map(a => (
            <div className="account-card" key={a.id}>
              <span className="account-type">{a.type}</span>
              <span className="account-balance">{a.balance}</span>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
