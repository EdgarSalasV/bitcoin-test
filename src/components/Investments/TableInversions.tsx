import { FC } from 'react'
import { iInvestments } from '.'

interface iTableInversionsProps {
  investments: iInvestments
}
export const TableInversions: FC<iTableInversionsProps> = ({ investments }) => {

  return <>
    <div className="TableInversions">
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
      </table>
    </div>
  </>
}