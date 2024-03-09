'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const UserRow = ({ user, onDelete }) => {
  const [confirmDelete, setConfirmDelete] = useState(false)

  const handleDelete = () => {
    onDelete(user.email)
    setConfirmDelete(false)
  }

  return (
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
          <Link href={`/dashboard/users/${user.id}`}>
            <button className="py-1 px-2 rounded-md text-white border-none cursor-pointer bg-teal-700">
              View
            </button>
          </Link>
          <button
            onClick={() => setConfirmDelete(true)}
            className="py-1 px-2 rounded-md text-white border-none cursor-pointer bg-red-600"
          >
            Delete
          </button>
        </div>
        {confirmDelete && (
          <div className="absolute bg-gray-500 border border-gray-800 rounded-md p-4 mt-6 mr-10">
            <p>¿Estás seguro de eliminar este usuario?</p>
            <div className="flex justify-between mt-2">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Sí, eliminar
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </td>
    </tr>
  )
}

export default UserRow
