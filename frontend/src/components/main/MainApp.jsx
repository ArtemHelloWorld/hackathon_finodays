import React, { useState } from 'react';
import AccountsList from "./AccountsList";
import NewAccount from "./NewAccount";
import Transactions from "./Transactions";


const MainPage = () => {
  const [activeWindow, setActiveWindow] = useState('accounts-list');

    return (
    <div className="black-dark-bg container-fluid h-100 ">
      <div className="d-flex flex-column h-100 p-0">
        <header className="black-light-bg text-white p-4 mx-4">
            <div className="d-flex justify-content-between align-items-center">
                <h1 onClick={() => window.location.reload()}>BankConnect</h1>
                <div className="d-flex">
                    <input type="text" className="form-control me-2" placeholder="Search"></input>
                    <button className="btn btn-light mx-1" onClick={() => setActiveWindow('transactions')}>Transactions</button>
                    <button className="btn btn-light mx-1" onClick={() => setActiveWindow('add-new-account')}>Add Account</button>
                </div>
            </div>
        </header>

        {
          activeWindow === 'accounts-list' && <AccountsList/>
        }
        {
          activeWindow === 'add-new-account' && <NewAccount/>
        }
        {
          activeWindow === 'transactions' && <Transactions/>
        }

      </div>
    </div>
    );
}

export default MainPage;

