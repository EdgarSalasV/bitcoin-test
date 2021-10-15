import { FC, useEffect, useState } from 'react'
import { UserInversion } from '../Investments/UserInversion'
import { GeneralBalance } from './GeneralBalance'
import dataCoin from "../../dataCoin.json";

//{
// [bitcoin]: 123,
// [etherium]: 555
//}

export interface IinvestmentList {
  [key: string]: { // key to NameCoin
    [key: string]: // key to Date /yyyy-dd-mm/
    iInvestment[]
  };
}

export interface iInvestment {
  amount: number, timestamp: string
}

export interface iCoinApi {
  id: string;
  slug: string;
  symbol: string;
  metrics: { market_data: { price_usd: number } };
}
export interface iCoinDefault {
  coin: string;
  roiMonth: number;
}

export const Investments: FC<{}> = ({ }) => {
  const coinList: iCoinDefault[] = [
    { coin: "bitcoin", roiMonth: 1.05 },
    { coin: "ethereum", roiMonth: 1.05 },
    { coin: "cardano", roiMonth: 1.05 }
  ];
  const [investmentList, setInvestmentList] = useState<IinvestmentList>({});
  const [coinsDatails, setCoinsDatails] = useState<iCoinApi[]>([]);
  
  useEffect(() => {
    getCoinsDetailsApi();
  }, [])

  const getCoinsDetailsApi = () => {
    const filterCoins = dataCoin.data.filter(({ slug }) => coinList.some(({ coin }) => coin === slug))
    setCoinsDatails(filterCoins);
  }
  return <>
    <div className="Investments">
      <UserInversion setInvestmentList={setInvestmentList} investmentList={investmentList} coinList={coinList} />
      <GeneralBalance coinList={coinList} investmentList={investmentList} coinsDatails={coinsDatails} />
    </div>
  </>
}