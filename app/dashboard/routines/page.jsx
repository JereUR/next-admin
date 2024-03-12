import Link from 'next/link'

import Search from '@/app/ui/dashboard/search/Search'
import Pagination from '@/app/ui/dashboard/pagination/Pagination'
import { fetchCustomRoutines } from '@/app/lib/data'
import { deleteCustomRoutine } from '@/app/lib/actions'
import DeleteForm from '@/app/ui/dashboard/users/DeleteForm'

const RoutinesPage = async ({ searchParams }) => {
  const q = searchParams?.q || ''
  const page = searchParams?.page || 1
  const { customRoutines, count } = await fetchCustomRoutines(q, page)

  return (
    <div className="bg-gray-800 p-5 rounded-lg mt-5">
      <div className="flex items-center justify-between">
        <Search placeholder="Search for a routine..." />
        <Link href="/dashboard/routines/add">
          <button className="p-2 bg-purple-800 text-white border-none rounded-md cursor-pointer">
            Add New
          </button>
        </Link>
      </div>
      <table className="transactions-table w-full">
        <thead>
          <tr>
            <td>Name</td>
            <td>Description</td>
            <td>Created At</td>
            <td>Action</td>
          </tr>
        </thead>
        {customRoutines.length > 0 ? (
          <tbody>
            {customRoutines.map((routine) => (
              <tr className="my-4" key={routine._id}>
                <td>
                  <div className="flex items-center gap-2">{routine.name}</div>
                </td>
                <td>{routine.description}</td>
                <td>{routine.createdAt?.toString().slice(4, 16)}</td>
                <td>
                  <div className="flex gap-2">
                    <div>
                      <Link href={`/dashboard/routines/${routine._id}`}>
                        <button className="py-1 px-2 rounded-md text-white border-none cursor-pointer bg-teal-700">
                          View
                        </button>
                      </Link>
                    </div>
                    <DeleteForm
                      item={routine.id}
                      onDelete={deleteCustomRoutine}
                      text={`la rutina '${routine.name}'`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan="4" className="text-center italic text-2xl">
                Sin Rutinas
              </td>
            </tr>
          </tbody>
        )}
      </table>
      <Pagination count={count} />
    </div>
  )
}

export default RoutinesPage
