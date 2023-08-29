import React, {useEffect, useState} from "react";
import useAxios from "../../utils/useAxios";

const Transactions = () => {
    const [loading, setLoading] = useState(true)
    const [accounts, setAccounts] = useState([])

    const [transactions, setTransactions] = useState([])
    const api = useAxios();

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



    async function fetchAccountTransactions(account) {
      let response = await api.get(`open-banking/v1.3/asip/accounts/${account.id}/transactions/`);
      if (response.status === 200){
        const datas = response.data.Data;
        datas.map(data => {
          data['my_account'] = data.sender_account === account.id
                ? data.sender_account
                : data.receiver_account

        })

        return datas;
      }
    }

    useEffect(() => {
      readAccounts()

      // .sort((a, b) =>
      //   new Date(a.date_created) - new Date(b.date_created)
      // )


    }, [])

    useEffect(() => {
      if (accounts) {
        accounts.map(account => {
        fetchAccountTransactions(account).then(data => {
            console.log(data)
            transactions.push(...data)
            console.log(transactions, '1')

          }
        )

      })

        setTimeout(() => {
              setTransactions(transactions.sort((a, b) =>
                new Date(a.date_update) - new Date(b.date_update)
              ).reverse())
              setLoading(false)
            }, 800)


      }

    }, [accounts])




    if (!loading) {
      return (
          <div className="container mt-5">
            <div className="row">
              <>
              <h3>Транзакции со всех ваших счетов</h3>
              {transactions.length > 0 ?

                  (transactions.map((transaction) => (
                      <div className="col-md-12 mw-50" key={transaction.id}>
                        <div className="black-light-bg text-white p-4 mx-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="">
                                    <h5 className="card-title">{transaction.sender_account === transaction.my_account
                                                                  ? transaction.sender_account
                                                                  : transaction.receiver_account
                                    }</h5>
                                    <p className="text-secondary mb-0">{transaction.date_update}</p>
                                </div>
                                {transaction.sender_account === transaction.my_account
                                                                  ? <div className="d-flex">
                                                                        <h5 className="text-danger">-{transaction.amount}</h5>
                                                                    </div>
                                                                  : <div className="d-flex">
                                                                        <h5 className="text-success">+{transaction.amount}</h5>
                                                                    </div>
                                }


                            </div>
                        </div>
                      </div>
                  ))):
                  <>Транзакции не найдены</>
              }</>
            </div>
          </div>
      )
    }

    else{
      return (
          <div id="loading-container" className="loading-container">
            <div className="loading-spinner"></div>
          </div>
      )
    }
  }

export default Transactions;
