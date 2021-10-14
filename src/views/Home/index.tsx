import { FC } from 'react'
import { BitCoinsDetails } from '../../components/BitCoinsDetails'
import { Investments } from '../../components/Investments'

export const Home: FC<{}> = () => {

  return <>
    <div className="Home">
      <Investments />
      <hr/>
      <hr/>
      <BitCoinsDetails/>
    </div>
  </>
}