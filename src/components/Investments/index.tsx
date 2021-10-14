import { FC, useState } from 'react'
import { UserInversion } from '../Investments/UserInversion'
import { TableInversions } from './TableInversions'

//{
// [bitcoin]: 123,
// [etherium]: 555
//}
export interface iInvestments {
  [key: string]: number,
}
export const Investments: FC<{}> = () => {
  const [investments, setInvestments] = useState<iInvestments>({})
  console.log('investments', investments)

  return <>
    <div className="Investments">
      <UserInversion setInvestments={setInvestments} investments={investments} />
      <TableInversions investments={investments} />
    </div>
  </>
}