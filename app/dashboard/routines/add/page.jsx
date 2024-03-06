'use client'
import { useState } from 'react'

import DayContainer from '../../../ui/dashboard/routines/DayContainer'
import CreateRoutineForm from '../../../ui/dashboard/routines/CreateRoutineForm'
import { addCustomRoutine } from '@/app/lib/actions'

const AddCustomRoutinePage = () => {
  const [days, setDays] = useState([
    { day: 'Lunes', exercises: [] },
    { day: 'Martes', exercises: [] },
    { day: 'Miércoles', exercises: [] },
    { day: 'Jueves', exercises: [] },
    { day: 'Viernes', exercises: [] },
    { day: 'Sábado', exercises: [] },
    { day: 'Domingo', exercises: [] }
  ])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const addExercise = (dayIndex, newExercise) => {
    const newDays = [...days]
    const dayExercises = newDays[dayIndex].exercises
    newDays[dayIndex].exercises = [...dayExercises, newExercise]
    setDays(newDays)
  }

  const createRoutine = (event) => {
    event.preventDefault()
    const routineData = {
      name,
      days,
      description
    }
    addCustomRoutine(routineData)
  }

  return (
    <div className="container mx-auto ">
      <h1>Crear rutina</h1>
      <form onSubmit={createRoutine}>
        <input
          type="text"
          placeholder="Nombre de la rutina"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          placeholder="Descripción (opcional)"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <button>Crear rutina</button>
      </form>
      <div className=" flex flex-col">
        {days.map((day, dayIndex) => (
          <DayContainer
            key={day.day}
            day={day.day}
            dayIndex={dayIndex}
            exercises={day.exercises}
            addExercise={addExercise}
          />
        ))}
      </div>
    </div>
  )
}

export default AddCustomRoutinePage
