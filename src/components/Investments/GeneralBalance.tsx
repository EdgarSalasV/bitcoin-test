import React from 'react'
import { FC, useEffect, useState } from 'react'
import { iCoinApi, iCoinDefault, IinvestmentList } from '.'

interface iGeneralBalanceProps {
  investmentList: IinvestmentList;
  coinsDatails: iCoinApi[];
  coinList: iCoinDefault[];
  inputDate: string;
}

interface iMetricsByMonth {
  [key: string]: {
    amount: number;
    totalCripto: number;
    costDollar: number;
    perMonth: number;
  }
}

export const GeneralBalance: FC<iGeneralBalanceProps> = (
  { investmentList, coinsDatails, coinList, inputDate }) => {
  const months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const [metricsByMonth, setMetricsByMonth] = useState<{ [key: string]: iMetricsByMonth }>({})
  console.log('ORALE', inputDate)

  useEffect(() => {
    getMetricsByMonth();
  }, [investmentList, coinsDatails])

  const getMetricsByMonth = () => {
    let metricFinal: { [key: string]: iMetricsByMonth } = {};
    for (const coin in investmentList) {
      const dateList = investmentList[coin];
      const dateKeys = Object.keys(dateList)
      dateKeys.map(date => {                                           // key to MONTH
        const month = new Date(date).getMonth() + 1
        console.log("month", month)
        const metricTmp = dateList[date].reduce((a: { [key: string]: iMetricsByMonth }, inv) => {
          const coinDetail = coinsDatails.find(({ slug }) => slug === coin)
          const perMonth = coinList.find(({ coin: coinMap }) => coin === coinMap)

          const price_usd = coinDetail ? coinDetail.metrics.market_data.price_usd : 0
          const roiMonth = perMonth ? perMonth.roiMonth : 0
          if (!a.hasOwnProperty(month)) {
            a = {
              [month]: {
                [coin]: {
                  amount: inv.amount,
                  costDollar: price_usd,
                  perMonth: roiMonth,
                  totalCripto: (price_usd * inv.amount) * roiMonth
                }
              }
            }
          } else {
            a = {
              [month]: {
                [coin]: {
                  amount: a[month][coin].amount + inv.amount,
                  costDollar: price_usd,
                  perMonth: roiMonth,
                  totalCripto: a[month][coin].totalCripto + ((price_usd * inv.amount) * roiMonth)
                }
              }
            }
          }
          return a
        }, {})
        metricFinal = { [month]: { ...metricFinal[month], ...metricTmp[month] } }
      })
    }
    //console.log('metricFinal', metricFinal)
    setMetricsByMonth({ ...metricsByMonth, ...metricFinal })
  }

  const BalanceTd = (nameCoin: string) => {
    const elementC: React.ReactElement[] = []
    for (let i = 1; i < months.length; i++) { //row (coins items)
      const hasMonth = metricsByMonth[i - 1]
      const hastCoin = hasMonth ? hasMonth[nameCoin] : null
      const totalCripto = hastCoin ? hastCoin.totalCripto : 0

      elementC.push(<td key={i}>
        {totalCripto}
      </td>)
      //console.log("totalCripto",totalCripto)
      //console.log("hasMonth",hasMonth)
    }
    return elementC
  }



  return <>
    <div className="GeneralBalance">
      {investmentList &&
        <table>
          <thead>
            <tr>
              {
                months.map((month, i) => <th key={month}>{month}</th>
                )
              }
            </tr>
          </thead>
          <tbody>
            {
              coinList.map(({ coin }) => <tr key={coin}>
                <td><strong>{coin}</strong></td>
                {BalanceTd(coin)}
              </tr>)
            }

          </tbody>
        </table>}
    </div>
  </>
}