'use client'

import { useState } from 'react'

const DeleteForm = ({ item, onDelete, text }) => {
  const [confirmDelete, setConfirmDelete] = useState(false)

  const handleDelete = () => {
    onDelete(item)
    setConfirmDelete(false)
  }

  return (
    <div className="">
      <button
        onClick={() => setConfirmDelete(true)}
        className="py-1 px-2 rounded-md text-white border-none cursor-pointer bg-red-600"
      >
        Delete
      </button>
      {confirmDelete && (
        <div className="absolute bg-gray-500 border border-gray-800 rounded-md p-4 mt-6 mr-10 gap-2">
          <p>¿Estás seguro de eliminar {text}?</p>
          <div className="flex justify-between mt-2 gap-4">
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
    </div>
  )
}

export default DeleteForm
