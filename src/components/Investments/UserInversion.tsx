import { Dispatch, FC, SetStateAction, useState } from 'react'
import { iInvestments } from '.';

interface iUserInversionProps {
  setInvestments: Dispatch<SetStateAction<iInvestments>>,
  investments: iInvestments
}

export const UserInversion: FC<iUserInversionProps> = ({ setInvestments, investments }) => {
  const coinList = ["bitcoin", "ether", "cardano"];
  const [selectedCoin, setSelectedCoin] = useState<string>("")
  const [dollarInput, setDollarInput] = useState<number>(0)
  console.log("refresh?", investments)
  const selectCoin = (e: any) => {
    const target = e.currentTarget;
    setSelectedCoin(target.value)
  };
  const handleChange = (e: any) => setDollarInput(Number(e.target.value))

  const addInvestment = () => {
    const investment: iInvestments = { [selectedCoin]: dollarInput }
    setInvestments({ ...investments, ...investment })
  }

  const Options = () => coinList.map((colorKey) => (
    <option value={colorKey} key={colorKey}>
      {colorKey}
    </option>
  ))
  return <>
    <div className="CoinContainer">
      <select
        name="selectedCoin"
        value={selectedCoin ? selectedCoin : ""}
        onChange={selectCoin}
        required
      >
        <option value="" disabled>
          Select a coint...
        </option>
        {Options()}
      </select>
      <input
        id="dollar"
        type="number"
        placeholder="Dollars"
        value={dollarInput}
        onChange={handleChange} />
      <input
        id="add"
        type="button"
        value="Add Investment"
        onClick={addInvestment} />
    </div>
  </>
}