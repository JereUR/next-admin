import React from 'react'
import Image from 'next/image'

const ExerciseList = ({
  exercises,
  editExercise,
  removeExercise,
  dayIndex
}) => {
  // Handle empty exercise list gracefully
  if (!exercises || exercises.length === 0) {
    return <p>Sin ejercicios.</p>
  }

  return (
    <ul className="">
      {exercises.map((exercise) => {
        return (
          <li
            key={exercise.id}
            className="flex justify-between rounded p-2 m-2 w-full bg-gray-800" // Adjust width as needed
          >
            <div className="text-center p-2">
              <p>Ejercicio:</p>
              <p>{exercise.name}</p>
            </div>
            <div className="text-center p-2">
              <p>Serie:</p>
              <p>
                {exercise.series} x {exercise.count} {exercise.measure}
              </p>
            </div>
            <div className="text-center p-2">
              <p>Descanso:</p>
              <p>{exercise.rest}</p>
            </div>
            <div className="text-center p-2">
              <p>{exercise.description}</p>
            </div>
            <div className="text-center p-2">
              <Image
                width={80}
                height={60}
                src={exercise.photo}
                alt={`Image for ${exercise.name} exercise`}
              />
            </div>
            <div className="flex gap-2 mt-2">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 ml-2"
                onClick={() => editExercise(dayIndex, exercise)}
              >
                Editar
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 ml-2"
                onClick={() => removeExercise(dayIndex, exercise.id)}
              >
                Borrar
              </button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default ExerciseList
