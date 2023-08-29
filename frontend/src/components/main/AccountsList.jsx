import React, {useEffect, useState} from "react";
import useAxios from "../../utils/useAxios";

const AccountsList = () => {
    const [loading, setLoading] = useState(true)

    const [banks, setBanks] = useState([])
    const [accounts, setAccounts] = useState([])
    const [accountBalances, setAccountBalances] = useState({});

    const groupedAccounts = {};
    const api = useAxios();


    function readBanks () {
        const request = indexedDB.open('banksDB', 1);
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          const objectStore = db.createObjectStore('banks', { keyPath: 'id' });
        };

        request.onsuccess = (event) => {
        const db = event.target.result;

          const transaction = db.transaction(['banks'], 'readonly');
          const objectStore = transaction.objectStore('banks');

          const getAllBanksRequest = objectStore.getAll();

          getAllBanksRequest.onsuccess = (event) => {
            const bankList = event.target.result;
            setBanks(bankList);
          };
        };

        request.onerror = (event) => {
          console.log('Error opening database:', event.target.error);
        };
    }
    function readAccounts () {
        const request = indexedDB.open('bankAccountsDB', 1);
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          const objectStore = db.createObjectStore('accounts', { keyPath: 'id' });
        };
        request.onsuccess = (event) => {
          const db = event.target.result;


            const transaction = db.transaction(['accounts'], 'readonly');
            const objectStore = transaction.objectStore('accounts');

            const getAllAccountsRequest = objectStore.getAll();

            getAllAccountsRequest.onsuccess = (event) => {
              const accountList = event.target.result;
              setAccounts(accountList);
            };
        }

        request.onerror = (event) => {
          console.log('Error opening database:', event.target.error);
        };
    }

    function groupAccounts() {
        accounts.forEach(account => {
          const bankId = account.bank;

          if (!groupedAccounts[bankId]) {
            groupedAccounts[bankId] = [];
          }

          groupedAccounts[bankId].push(account);
        });
    }

    function getBankNameById(bankId) {
      const bank = banks.find(bank => bank.id.toString() === bankId.toString());
      return bank ? bank.name : 'Unknown Bank';
    }

    async function getAccountBalance(account){
      let response = await api.get(`open-banking/v1.3/aisp/accounts/${account.id}/balances/`);
      if (response.status === 200){
        return response.data
      }
    }


    useEffect(() => {
        readBanks()
        readAccounts()
        setTimeout(() => {
          setLoading(false)
        }, 1000)


    }, [])

  useEffect(() => {
    const fetchAccountBalances = async () => {
      const balances = {};

      for (const account of accounts) {
        const balance = await getAccountBalance(account);
        balances[account.id] = balance.Data.amount;
      }

      setAccountBalances(balances);
    };

    fetchAccountBalances();
  }, [accounts]);

    if (!loading) {
      if (accounts.length){

      groupAccounts()

      return (
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header">
                    <h2>Accounts</h2>
                  </div>
                  <div className="list-group list-group-flush">
                    {Object.keys(groupedAccounts).map(bankId => (
                        <div className="list-group-item" key={bankId}>
                          <h3>{`${getBankNameById(bankId)}`}</h3>
                          <ul className="list-group list-group-flush">
                            {groupedAccounts[bankId].map(account => (
                                <li className="list-group-item d-flex justify-content-between align-items-center"
                                    key={account.id}>
                                  {`${account.id}`}
                                  <span className="badge bg-success">{accountBalances[account.id] ? accountBalances[account.id] + ' ' + account.currency: '...'}</span>
                                </li>
                            ))}
                          </ul>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
      else{
        return (
            <h1>Добавьте свой первый счет</h1>
        )
      }
    }
    else{
      return (
          <div id="loading-container" className="loading-container">
            <div className="loading-spinner"></div>
          </div>
      )
    }

  }

export default AccountsList;
