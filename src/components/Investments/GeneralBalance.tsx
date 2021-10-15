import { FC, useEffect, useState } from 'react'
import { iCoinApi, iCoinDefault, IinvestmentList } from '.'

interface iGeneralBalanceProps {
  investmentList: IinvestmentList;
  coinsDatails: iCoinApi[];
  coinList: iCoinDefault[]
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
  { investmentList, coinsDatails, coinList }) => {
  const months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const [metricsByMonth, setMetricsByMonth] = useState<{ [key: string]: iMetricsByMonth }>({})
  console.log('investmentList', investmentList)

  useEffect(() => {
    setMetricsFc()
  }, [])

  useEffect(() => {
    let newMetric: iMetricsByMonth = {}
    getMetricsByMonth();
    // for (const coinName in investmentList) {
    //   const coinDetail = coinsDatails.find(({ slug }) => slug === coinName)
    //   const perMonth = coinList.find(({ coin: coinMap }) => coinName === coinMap)
    //   newMetric = {
    //     ...newMetric,
    //     ...{
    //       [coinName]: {
    //         investment: investmentList[coinName],
    //         costDollar: coinDetail ? coinDetail.metrics.market_data.price_usd : 0,
    //         perMonth: perMonth ? perMonth.roiMonth : 0,
    //         totalCripto: 0,
    //       }
    //       // [coinName]: {
    //       //  "2020-11-01": [
    //       //    {
    //       //      investment: investmentList[coinName],
    //       //      costDollar: coinDetail ? coinDetail.metrics.market_data.price_usd : 0,
    //       //    perMonth: perMonth ? perMonth.roiMonth : 0,
    //       //    totalCripto: 0,
    //       //    },
    //       //    ...
    //       //    {}
    //       //  ],...
    //       // "anotherDate": [{},...]
    //       // }
    //     }
    //   }
    // }
    // setMetricsByMonth(newMetric)
  }, [investmentList, coinsDatails])

  const getMetricsByMonth = () => {
    let metric: iMetricsByMonth = {};
    for (const { coin } of coinList) {
      const dateList = investmentList[coin]
      if (!dateList) return

      const dateKeys = Object.keys(dateList)
      dateKeys.map(date => {                                           // key to MONTH
        const metricTmp = dateList[date].reduce((a: { [key: string]: iMetricsByMonth }, inv) => {
          const month = new Date(date).getMonth() + 1
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
              ...a,
              ...{
                [month]: {
                  [coin]: {
                    amount: a[month][coin].amount + inv.amount,
                    costDollar: price_usd,
                    perMonth: roiMonth,
                    totalCripto: (price_usd * inv.amount) * roiMonth
                  }
                }
              }
            }
          }

          return a
        }, {})
        setMetricsByMonth({ ...metricsByMonth, ...metricTmp })
      })
    }

  }

  const setMetricsFc = () => {
    // const newMetrics: { [key: string]: iMetricsByMonth } = coinList.reduce((a, { coin }) => {
    //   a = {
    //     ...a,
    //     ...{
    //       [(new Date()).toLocaleDateString()]: {
    //         [coin]: {
    //           costDollar: 0,
    //           totalCripto: 0,
    //           perMonth: 0,
    //           investment: 0
    //         }
    //       }
    //     }
    //   }
    //   return a
    // }, {})
    // setMetricsByMonth(newMetrics)
  }

  const BalanceTd = (nameCoin: string) => {
    // months.map((month, i) => {
    //   console.log('i', i)
    //   // metricsByMonth[i + 1]
    //   console.log('metricsByMonth[i + 1]', metricsByMonth[i + 1])
    //   console.log('metricsByMonth', metricsByMonth)
    //   return <td>

    //   </td>
    // })
    return <th key={nameCoin}>X</th>
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