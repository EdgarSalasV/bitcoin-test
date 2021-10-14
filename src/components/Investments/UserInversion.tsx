import { Dispatch, FC, SetStateAction, useState } from 'react'
import { iCoinDefault, iInvestments } from '.';

interface iUserInversionProps {
  setInvestments: Dispatch<SetStateAction<iInvestments>>,
  investments: iInvestments,
  coinList: iCoinDefault[]
}
interface iInput {
  value: string | number
  error: boolean;
  message: string;
}

export const UserInversion: FC<iUserInversionProps> = ({ setInvestments, investments, coinList }) => {
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

  const selectCoin = (e: any) => {
    const target = e.currentTarget;

    setSelectedCoin({ ...selectedCoin, ...{ value: target.value, error: false } })
  };

  const handleChange = (e: any) => {
    const number = Number(e.target.value);
    const value = number >= 0 ? number : "";
    setDollarInput({ ...dollarInput, ...{ value, error: false } })
  }

  const addInvestment = () => {
    if (!dollarInput || !selectedCoin.value) {
      validationInvestment()
      return;
    }
    const investment: iInvestments = { [selectedCoin.value]: Number(dollarInput.value) }
    setInvestments({ ...investments, ...investment })
  }

  const validationInvestment = () => {
    if (!selectedCoin.value) {
      setSelectedCoin({ ...selectedCoin, ...{ error: true } })
    }
    if (!dollarInput.value) {
      setDollarInput({ ...dollarInput, ...{ error: true } })
    }
  }

  const Options = () => coinList.map(({coin}) => (
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