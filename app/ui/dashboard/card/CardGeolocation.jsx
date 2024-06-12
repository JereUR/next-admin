import Link from 'next/link'
import { MdLocationCity } from 'react-icons/md'

const CardGeolocation = () => {
  return (
    <div className="bg-gray-800 p-5 rounded-lg flex gap-5 cursor-pointer w-full hover:bg-gray-700">
      <MdLocationCity size={24} />
      <div className="flex flex-col">
        <span>Geolocation</span>
        <Link href="/dashboard/map" className="p-2 bg-purple-600 text-white">
          See map
        </Link>
      </div>
    </div>
  )
}

export default CardGeolocation
