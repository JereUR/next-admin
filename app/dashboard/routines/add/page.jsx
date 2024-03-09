'use client'
import { useState} from 'react'

import DayContainer from '../../../ui/dashboard/routines/DayContainer'
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
  const [showExerciseForm, setShowExerciseForm] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [exerciseToEdit, setExerciseToEdit] = useState(null)

  const addExercise = (dayIndex, newExercise) => {
    const newDays = [...days]
    const dayExercises = newDays[dayIndex].exercises
    newDays[dayIndex].exercises = [...dayExercises, newExercise]
    setDays(newDays)
  }

  const editExercise = (dayIndex, exercise) => {
    removeExercise(dayIndex, exercise.id)
    setExerciseToEdit(exercise)
    setShowExerciseForm((prevShow) => {
      const newShow = [...prevShow]
      newShow[dayIndex] = true
      return newShow
    })
  }

  const removeExercise = (dayIndex, id) => {
    const newDays = [...days]
    const newDayExercises = days[dayIndex].exercises.filter(
      (ex) => ex.id !== id
    )
    newDays[dayIndex].exercises = newDayExercises
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
            editExercise={editExercise}
            removeExercise={removeExercise}
            showExerciseForm={showExerciseForm}
            setShowExerciseForm={setShowExerciseForm}
            exerciseToEdit={exerciseToEdit}
          />
        ))}
      </div>
    </div>
  )
}

export default AddCustomRoutinePage
