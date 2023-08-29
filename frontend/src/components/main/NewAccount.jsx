import React, {useEffect, useState} from "react";
import useAxios from "../../utils/useAxios";

const NewAccount = () => {
    const [loading, setLoading] = useState(true)

    const [banks, setBanks] = useState([]);
    const [clickedBank, setClickedBank] = useState(null);
    const [bankAccounts, setBankAccounts] = useState([]);
    const api = useAxios();

    async function fetchBanks() {
      let response = await api.get('open-banking/v1.3/banks/');
      if (response.status === 200){
        const request = indexedDB.open('banksDB', 1);

        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains('banks')) {
            db.createObjectStore('banks', { keyPath: 'id' });
          }
        };

        request.onsuccess = (event) => {
          const db = event.target.result;
          const transaction = db.transaction(['banks'], 'readwrite');
          const objectStore = transaction.objectStore('banks');
          response.data.Data.map((bank) => {
            console.log(bank)
            objectStore.add(bank);
          })

        };

        request.onerror = (event) => {
          console.log('Error opening database:', event.target.error);
        };
        return response.data.Data
      }
    }

    async function fetchBankAccounts() {
      let response = await api.get(`open-banking/v1.3/bank/${clickedBank.id}/accounts/`);
      if (response.status === 200){
        return response.data
      }
    }

    function addAccount(account) {
      const request = indexedDB.open('bankAccountsDB', 1);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const objectStore = db.createObjectStore('accounts', { keyPath: 'id' });
      };
      request.onsuccess = (event) => {
        const db = event.target.result;

          const transaction = db.transaction(['accounts'], 'readwrite');
          const objectStore = transaction.objectStore('accounts');
          objectStore.add(account);
          window.location.reload()
      };

      request.onerror = (event) => {
        console.log('Error opening database:', event.target.error);
      };
    }

    useEffect(() => {
      fetchBanks().then(data => {
          setBanks(data)
          setTimeout(() => {
            setLoading(false)
          }, 600)

        }
      )
    }, [])

    useEffect(() => {
      if (clickedBank) {
        setLoading(true)
        setBanks(null);
        fetchBankAccounts().then(data => {
              setBankAccounts(data.Data)
            }
        )
        setTimeout(() => {
            setLoading(false)
          }, 800)
      }
    }, [clickedBank]);

    if (!loading) {
      if (banks) {
        return (
            <div className="container mt-5">
              <div className="row">
                {banks.map((bank) => (
                    <div className="col-md-4">
                      <button className="btn btn-light btn-fixed-height mb-4" onClick={() => setClickedBank(bank)}>
                        <h2>{bank.name}</h2>
                        <p className="small">{bank.description}</p>
                      </button>
                    </div>
                ))}
              </div>
            </div>
        );
      } else if (bankAccounts) {
        return (
            <div className="container mt-5">
              <div className="row">
                {bankAccounts.length > 0 ?
                    (bankAccounts.map((account) => (
                        <div className="col-md-6" key={account.id}>
                          <div className="card mb-4">
                            <div className="card-body">
                              <h5 className="card-title mb-3">Счет {account.id}</h5>
                              <p className="card-text mb-0">
                                <strong>Тип счета:</strong> {account.accountType}
                              </p>
                              <p className="card-text mb-1">
                                <strong>Описание</strong> {account.accountDescription}
                              </p>
                              <a className="btn btn-primary" onClick={() => addAccount(account)}>Добавить</a>
                            </div>
                          </div>
                        </div>
                    ))) :
                    <>Счета в этом банке не найдены</>
                }
              </div>
            </div>
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

export default NewAccount;
