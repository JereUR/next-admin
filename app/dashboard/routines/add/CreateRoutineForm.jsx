'use client'
import { useState } from 'react'

const CreateRoutineForm = ({ days, exercises, createRoutine }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const routineData = {
      name,
      exercises,
      description
    }
    createRoutine(routineData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre de la rutina"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="text"
        placeholder="Descripción (opcional)"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button type="submit">Crear rutina</button>
    </form>
  )
}

export default CreateRoutineForm
