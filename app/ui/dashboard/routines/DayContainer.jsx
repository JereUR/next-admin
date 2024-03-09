'use client'
import { useState } from 'react'

import ExerciseForm from './ExerciseForm'
import ExerciseList from './ExerciseList'

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
    setShowExerciseForm((prevShow) => {
      const newShow = [...prevShow]
      newShow[dayIndex] = true
      return newShow
    })
  }

  const handleSubmit = (dayIndex, newExercise) => {
    addExercise(dayIndex, newExercise)
    setShowExerciseForm((prevShow) => {
    const newShow = [...prevShow];
    newShow[dayIndex] = false;
    return newShow;
  });
  }

  return (
    <div className="border rounded p-4 mb-4 ">
      <h3>{day}</h3>
      {!showExerciseForm[dayIndex] && (
        <button
          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700"
          onClick={handleAddExercise}
        >
          Agregar ejercicio
        </button>
      )}
      {showExerciseForm[dayIndex] && (
        <ExerciseForm
          dayIndex={dayIndex}
          handleSubmit={handleSubmit}
          setShowExerciseForm={setShowExerciseForm}
          exerciseToEdit={exerciseToEdit}
          showExerciseForm={showExerciseForm}
        />
      )}
      <ExerciseList
        exercises={exercises}
        editExercise={editExercise}
        removeExercise={removeExercise}
        dayIndex={dayIndex}
      />
    </div>
  )
}

export default DayContainer
