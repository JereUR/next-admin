import Link from 'next/link'
import Image from 'next/image'

import Search from '@/app/ui/dashboard/search/Search'
import Pagination from '@/app/ui/dashboard/pagination/Pagination'
import { fetchUsers } from '@/app/lib/data'
import { deleteUser } from '@/app/lib/actions'
import DeleteForm from '@/app/ui/dashboard/users/DeleteForm'

const UsersPage = async ({ searchParams }) => {
  const q = searchParams?.q || ''
  const page = searchParams?.page || 1
  const { users, count } = await fetchUsers(q, page)

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
                    src={user.img || '/noavatar.png'}
                    alt={`User ${user.id} photo`}
                    width={40}
                    height={40}
                  />
                  {user.username}
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.createdAt?.toString().slice(4, 16)}</td>
              <td>{user.isAdmin ? 'Admin' : 'Client'}</td>
              <td>{user.isActive ? 'Active' : 'Passive'}</td>
              <td>
                <div className="flex gap-2">
                  <div>
                    <Link href={`/dashboard/users/${user.id}`}>
                      <button className="py-1 px-2 rounded-md text-white border-none cursor-pointer bg-teal-700">
                        View
                      </button>
                    </Link>
                  </div>
                  <DeleteForm
                    email={user.email}
                    onDelete={deleteUser}
                    text={`el usuario '${user.username}'`}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  )
}

export default UsersPage
