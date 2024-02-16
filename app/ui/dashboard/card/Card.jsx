import { MdSupervisedUserCircle } from 'react-icons/md'

const Card = () => {
  const porc = 12
  return (
    <div className="bg-gray-800 p-5 rounded-lg flex gap-5 cursor-pointer w-full hover:bg-gray-700">
      <MdSupervisedUserCircle size={24} />
      <div className="flex flex-col">
        <span>Total Users</span>
        <span className="text-2xl font-medium">10.273</span>
        <span className="text-sm font-light">
          <span className={`${porc > 0 ? 'text-lime-500' : 'text-red-500'}`}>
            {porc}%
          </span>{' '}
          more than previous week
        </span>
      </div>
    </div>
  )
}

export default Card
