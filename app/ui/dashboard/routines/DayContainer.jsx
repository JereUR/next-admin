'use client'
import { useState } from 'react'

import ExerciseForm from './ExerciseForm'

const DayContainer = ({
  day,
  dayIndex,
  exercises,
  exerciseToEdit,
  addExercise,
  editExercise,
  removeExercise,
  showExerciseForm,
  setShowExerciseForm
}) => {
  const handleAddExercise = () => {
    setShowExerciseForm(true)
  }

  const handleSubmit = (dayIndex, newExercise) => {
    addExercise(dayIndex, newExercise)
    setShowExerciseForm(false)
  }

  return (
    <div className="border rounded p-4 mb-4 ">
      <h3>{day}</h3>
      {!showExerciseForm && (
        <button
          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700"
          onClick={handleAddExercise}
        >
          Agregar ejercicio
        </button>
      )}
      {showExerciseForm && (
        <ExerciseForm
          dayIndex={dayIndex}
          handleSubmit={handleSubmit}
          setShowExerciseForm={setShowExerciseForm}
          exerciseToEdit={exerciseToEdit}
        />
      )}
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id}>
            {exercise.name}
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 ml-2"
              onClick={() => editExercise(dayIndex, exercise)}
            >
              Editar
            </button>
            {/* Delete button */}
            <button
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 ml-2"
              onClick={() => removeExercise(dayIndex, exercise.id)}
            >
              Borrar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DayContainer
