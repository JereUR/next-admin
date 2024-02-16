import Card from '../ui/dashboard/card/Card'
import Chart from '../ui/dashboard/chart/Chart'
import RightBar from '../ui/dashboard/rightbar/RightBar'
import Transactions from '../ui/dashboard/transactions/Transactions'

const DashboardPage = () => {
  return (
    <div className="flex gap-5 mt-5">
      <div className="w-3/4 flex flex-col gap-5">
        <div className="flex gap-5 justify-between">
          <Card />
          <Card />
          <Card />
        </div>
        <Transactions />
        <Chart />
      </div>
      <div className="w-1/4">
        <RightBar />
      </div>
    </div>
  )
}

export default DashboardPage
