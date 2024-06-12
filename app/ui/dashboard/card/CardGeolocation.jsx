import Link from 'next/link'
import { MdLocationCity } from 'react-icons/md'

const CardGeolocation = () => {
  const porc = 12
  return (
    <div className="bg-gray-800 p-5 rounded-lg flex gap-5 cursor-pointer w-full hover:bg-gray-700">
      <MdLocationCity size={24} />
      <div className="flex flex-col">
        <span>Geolocation</span>
        <span className="text-2xl font-medium">10.273</span>
        <span className="text-sm font-light">
          <span className={`${porc > 0 ? 'text-lime-500' : 'text-red-500'}`}>
            {porc}%
          </span>{' '}
          more than previous week
        </span>
        <Link href="/dashboard/map">See my location</Link>
      </div>
    </div>
  )
}

export default CardGeolocation
