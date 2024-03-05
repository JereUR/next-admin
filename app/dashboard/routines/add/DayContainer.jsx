'use client'
import { useState } from 'react'

import ExerciseForm from './ExerciseForm'

const DayContainer = ({ day, dayIndex, exercises, addExercise }) => {
  const [showExerciseForm, setShowExerciseForm] = useState(false)

  const handleAddExercise = () => {
    setShowExerciseForm(true)
  }

  const handleSubmit = (dayIndex, newExercise) => {
    addExercise(dayIndex, newExercise)
    setShowExerciseForm(false)
  }

  return (
    <div className="border rounded p-4 mb-4">
      <h3>{day}</h3>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id}>{exercise.name}</li>
        ))}
      </ul>
      <button
        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700"
        onClick={handleAddExercise}
      >
        Agregar ejercicio
      </button>
      {showExerciseForm && (
        <ExerciseForm dayIndex={dayIndex} handleSubmit={handleSubmit} />
      )}
    </div>
  )
}

export default DayContainer
