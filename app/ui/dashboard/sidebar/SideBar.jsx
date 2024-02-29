import Image from 'next/image'
import MenuLink from './menuLink/MenuLink'
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout
} from 'react-icons/md'
import { auth, signOut } from '@/app/auth'

const menuItems = [
  {
    title: 'Pages',
    list: [
      {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <MdDashboard />
      },
      {
        title: 'Users',
        path: '/dashboard/users',
        icon: <MdSupervisedUserCircle />
      },
      {
        title: 'Products',
        path: '/dashboard/products',
        icon: <MdShoppingBag />
      },
      {
        title: 'Transactions',
        path: '/dashboard/transactions',
        icon: <MdAttachMoney />
      }
    ]
  },
  {
    title: 'Analytics',
    list: [
      {
        title: 'Revenue',
        path: '/dashboard/revenue',
        icon: <MdWork />
      },
      {
        title: 'Reports',
        path: '/dashboard/reports',
        icon: <MdAnalytics />
      },
      {
        title: 'Teams',
        path: '/dashboard/teams',
        icon: <MdPeople />
      }
    ]
  },
  {
    title: 'User',
    list: [
      {
        title: 'Settings',
        path: '/dashboard/settings',
        icon: <MdOutlineSettings />
      },
      {
        title: 'Help',
        path: '/dashboard/help',
        icon: <MdHelpCenter />
      }
    ]
  }
]

const SideBar = async () => {
  const { user } = await auth()
  console.log(user)
  return (
    <div className="sticky top-10">
      <div className="flex items-center gap-5 mb-5">
        <Image
          className="rounded-full object-cover"
          src="/noavatar.png"
          alt="avatar-img"
          width="50"
          height="50"
        />
        <div className="flex flex-col">
          <span className="font-medium">Jeremías Dominguez Vega</span>
          <span className="text-xs text-gray-300">Administrator</span>
        </div>
      </div>
      <ul className="list-none">
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className="text-gray-300 font-bold text-sm my-10 mx-0">
              {cat.title}
            </span>
            {cat.list.map((item) => (
              <MenuLink key={item.title} item={item} />
            ))}
          </li>
        ))}
      </ul>
      <form
        action={async () => {
          'use server'
          await signOut()
        }}
      >
        <button className="p-5 flex items-center gap-2 my-1 mx-0 rounded-lg hover:bg-gray-700 bg-none border-none w-full text-white cursor-pointer">
          <MdLogout />
          Logout
        </button>
      </form>
    </div>
  )
}

export default SideBar
