import { FC, useEffect, useState } from 'react'
import { iCoinApi, iCoinDefault, iInvestments } from '.'

interface iGeneralBalanceProps {
  investments: iInvestments;
  coinsDatails: iCoinApi[];
  coinList: iCoinDefault[]
}
interface iMetrics {
  [key: string]: {
    investment: number;
    totalCripto: number;
    costDollar: number;
    perMonth: number;
  }
}
export const GeneralBalance: FC<iGeneralBalanceProps> = (
  { investments, coinsDatails, coinList }) => {
  const [metrics, setMetrics] = useState<iMetrics>({})
  console.log('metrics', metrics)

  useEffect(() => {
    setMetricsFc()
  }, [])

  useEffect(() => {
    let newMetric: iMetrics = {}
    for (const coinName in investments) {
      const coinDetail = coinsDatails.find(({ slug }) => slug === coinName)
      const perMonth = coinList.find(({ coin: coinMap }) => coinName === coinMap)
      newMetric = {
        ...newMetric,
        ...{
          [coinName]: {
            investment: investments[coinName],
            costDollar: coinDetail ? coinDetail.metrics.market_data.price_usd : 0,
            perMonth: perMonth ? perMonth.roiMonth : 0,
            totalCripto: 0,
          }
          // [coinName]: {
          //  "2020-11-01": [
          //    {
          //      investment: investments[coinName],
          //      costDollar: coinDetail ? coinDetail.metrics.market_data.price_usd : 0,
          //    perMonth: perMonth ? perMonth.roiMonth : 0,
          //    totalCripto: 0,
          //    },
          //    ...
          //    {}
          //  ],...
          // "anotherDate": [{},...]
          // }
        }
      }
    }
    setMetrics(newMetric)
  }, [investments, coinsDatails])

  const setMetricsFc = () => {
    const newMetrics: iMetrics = coinList.reduce((a, { coin }) => {
      a = {
        ...a,
        ...{
          [coin]: {
            costDollar: 0,
            totalCripto: 0,
            perMonth: 0,
            investment: 0
          }
        }
      }
      return a
    }, {})
    setMetrics(newMetrics)
  }

  return <>
    <div className="GeneralBalance">
      {investments &&
        <table>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Investment</th></tr>
          </thead>
          <tbody>
            {
              //{
              // bitcoin: 123,
              // etherium: 555
              //}
              Object.keys(investments).map(coinKey =>
                <tr key={coinKey}>
                  <th>{coinKey}</th>
                  <th>{investments[coinKey]}</th>
                </tr>
              )
            }
          </tbody>
        </table>}
    </div>
  </>
}