'use client'
import { useState } from 'react'

import DayContainer from './DayContainer'
import CreateRoutineForm from './CreateRoutineForm'

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

  const addExercise = (dayIndex, newExercise) => {
    console.log(dayIndex)
    console.log(newExercise)
    const newDays = [...days]
    const dayExercises = newDays[dayIndex].exercises
    newDays[dayIndex].exercises = [...dayExercises, newExercise]
    setDays(newDays)
  }

  const createRoutine = (routineData) => {
    // Implementar la lógica para enviar la información de la rutina al servidor
    console.log('Enviando rutina:', routineData)
  }

  return (
    <div className="container mx-auto">
      <h1>Crear rutina</h1>
      <div className="flex flex-wrap">
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
      <CreateRoutineForm exercises={days} createRoutine={createRoutine} />
    </div>
  )
}

export default AddCustomRoutinePage
