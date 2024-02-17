'use client'

import { usePathname } from 'next/navigation'
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch
} from 'react-icons/md'

const NavBar = () => {
  const pathname = usePathname()

  return (
    <div className="flex items-center justify-between p-5 rounded-lg bg-gray-800">
      <div className="text-gray-300 font-bold capitalize">
        {pathname.split('/').pop()}
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 bg-gray-700 p-2 rounded-lg">
          <MdSearch />
          <input
            className="bg-transparent border-none text-white focus:outline-none"
            type="text"
            placeholder="Search..."
          />
        </div>
        <div className="flex gap-5">
          <MdOutlineChat size={20} />
          <MdNotifications size={20} />
          <MdPublic size={20} />
        </div>
      </div>
    </div>
  )
}

export default NavBar
