import { Dispatch, FC, SetStateAction, useState } from 'react'
import { iCoinDefault, iInvestment, IinvestmentList } from '.';

interface iUserInversionProps {
  setInvestmentList: Dispatch<SetStateAction<IinvestmentList>>,
  investmentList: IinvestmentList,
  coinList: iCoinDefault[]
}
interface iInput {
  value: string | number
  error: boolean;
  message: string;
}

export const UserInversion: FC<iUserInversionProps> = ({ setInvestmentList, investmentList, coinList }) => {
  const [selectedCoin, setSelectedCoin] = useState<iInput>({
    value: "",
    error: false,
    message: "pls select a coin"
  })
  const [dollarInput, setDollarInput] = useState<iInput>({
    value: "",
    error: false,
    message: "pls enter a valid amount"
  })

  const [dateInput, setDateInput] = useState<iInput>({
    value: dateFormat(),
    error: false,
    message: "pls enter a valid date"
  })

  const selectCoin = (e: any) => {
    const target = e.currentTarget;
    setSelectedCoin({ ...selectedCoin, ...{ value: target.value, error: false } })

  };



  const handleChange = (e: any) => {
    const number = Number(e.target.value);
    const value = number >= 0 ? number : "";
    setDollarInput({ ...dollarInput, ...{ value, error: false } })
  }
  
  const handleDate = (e:any) => {
    console.log("event from Date",e.target.value)
    setDateInput({...dateInput, ...{error: false, value: e.target.value}})
    
  }

  console.log("dateInput",dateInput)
  
  function dateFormat(){
  
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;

  }



  const addInvestment = () => {
    if (!dollarInput.value || !selectedCoin.value) {
      validationInvestment()
      return;
    }
    const today = (new Date()).toLocaleDateString()
    console.log("today: ",today)
    const hasDataDate = investmentList[selectedCoin.value]
    console.log("hasDataDate",hasDataDate)// {"todayDate": {amount: , timestamp: "Hr:Mnt:Sc Timezone} }
    const dataDate = hasDataDate ? hasDataDate[today] : []
    console.log("dataDate[today]",dataDate) // has dataDate[{amount: n tiempstamp:  "Hr:Mnt:Sc Timezone}]
    const investmentListTmp: iInvestment[] = [
      ...dataDate,
      {
        amount: Number(dollarInput.value), timestamp: (new Date()).toTimeString()
      }
    ]

    const investmentsTmp: IinvestmentList = {
      [selectedCoin.value]: {
        [today]: investmentListTmp
      }
    }
    setInvestmentList({ ...investmentList, ...investmentsTmp })
    console.log("investmentsTmp:",investmentsTmp)
    console.log("investTmp",investmentListTmp)
  }

  const validationInvestment = () => {
    if (!selectedCoin.value) {
      setSelectedCoin({ ...selectedCoin, ...{ error: true } })
    }
    if (!dollarInput.value) {
      setDollarInput({ ...dollarInput, ...{ error: true } })
    }
  }

  const Options = () => coinList.map(({ coin }) => (
    <option value={coin} key={coin}>
      {coin}
    </option>
  ))

  return <>
    <div className="coinContainer">
      <div className="SelectCoin">
        <select
          name="selectedCoin"
          value={selectedCoin.value ? selectedCoin.value : ""}
          onChange={selectCoin}
          required
        >
          <option value="" disabled>
            Select a coint...
          </option>
          {Options()}
        </select>
        {
          selectedCoin.error &&
          <label style={{ color: "red" }}>{selectedCoin.message}</label>
        }
      </div>
      <div className="dollarContainer">
        <input
          id="dollar"
          type="number"
          placeholder="Dollars"
          value={dollarInput.value}
          onChange={handleChange} />

        <input
          id="date"
          type="date"
          placeholder="DD/MM/YYYY"
          value={dateInput.value}
          onChange={handleDate} />
        {
          dollarInput.error &&
          <label style={{ color: "red" }}>{dollarInput.message}</label>
        }
      </div>

      <input
        id="add"
        type="button"
        value="Add Investment"
        onClick={addInvestment} />
    </div>
  </>
}