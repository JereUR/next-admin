'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MenuLink = ({ item }) => {
  const pathname = usePathname()

  return (
    <Link
      className={`p-5 flex items-center gap-2 my-1 mx-0 rounded-lg hover:bg-gray-700 ${
        pathname === item.path && 'bg-gray-700'
      }`}
      href={item.path}
    >
      {item.icon}
      {item.title}
    </Link>
  )
}

export default MenuLink
