import Link from 'next/link'
import Image from 'next/image'

import Search from '@/app/ui/dashboard/search/Search'
import Pagination from '@/app/ui/dashboard/pagination/Pagination'

const users = [
  {
    id: 1,
    name: 'John Doe',
    img: '/noavatar.png',
    email: 'john@gmail.com',
    date: '13.01.2022',
    role: 'Admin',
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    img: '/noavatar.png',
    email: 'john@gmail.com',
    date: '13.01.2022',
    role: 'Admin',
    status: 'Active'
  },
  {
    id: 3,
    name: 'John Doe',
    img: '/noavatar.png',
    email: 'john@gmail.com',
    date: '13.01.2022',
    role: 'Admin',
    status: 'Active'
  }
]

const UsersPage = () => {
  return (
    <div className="bg-gray-800 p-5 rounded-lg mt-5">
      <div className="flex items-center justify-between">
        <Search placeholder="Search for a user..." />
        <Link href="/dashboard/users/add">
          <button className="p-2 bg-purple-800 text-white border-none rounded-md cursor-pointer">
            Add New
          </button>
        </Link>
      </div>
      <table className="transactions-table w-full">
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr className="my-4" key={user.id}>
              <td>
                <div className="flex items-center gap-2">
                  <Image
                    className="rounded-full object-cover"
                    src={user.img}
                    alt={`User ${user.id} photo`}
                    width={40}
                    height={40}
                  />
                  {user.name}
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.date}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <div className="flex gap-2">
                  <Link href="/dashboard/users/test">
                    <button className="py-1 px-2 rounded-md text-white border-none cursor-pointer bg-teal-700">
                      View
                    </button>
                  </Link>
                  <button className="py-1 px-2 rounded-md text-white border-none cursor-pointer bg-red-600">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  )
}

export default UsersPage
