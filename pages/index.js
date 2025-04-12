import Head from 'next/head'
import dynamic from 'next/dynamic'

const FareCalculator = dynamic(() => import('../FareCalculator'), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>जय भोले Fare Calculator</title>
      </Head>
      <FareCalculator />
    </>
  )
}
