import { useState } from 'react'

const ExerciseForm = ({ dayIndex, handleSubmit, setShowExerciseForm }) => {
  const [name, setName] = useState('')
  const [series, setSeries] = useState(0)
  const [count, setCount] = useState(0)
  const [measure, setMeasure] = useState('')
  const [zone, setZone] = useState('')

  const handleSubmitExercise = (event) => {
    event.preventDefault()
    const id = Math.random().toString(36).substring(2, 15)
    const newExercise = {
      id,
      name,
      series,
      count,
      measure,
      zone
    }
    handleSubmit(dayIndex, newExercise)
  }

  return (
    <div className="bg-gray-800 p-5 rounded-lg mt-5">
      <form
        onSubmit={handleSubmitExercise}
        className="form-routine flex flex-wrap justify-between"
      >
        <button type="button" onClick={() => setShowExerciseForm(false)}>
          X
        </button>
        <input
          type="text"
          name="name"
          placeholder="Nombre del ejercicio"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="number"
          name="series"
          placeholder="Series"
          value={series}
          onChange={(event) => setSeries(event.target.value)}
        />
        <input
          type="number"
          name="count"
          placeholder="Repeticiones/Segundos"
          value={count}
          onChange={(event) => setCount(event.target.value)}
        />
        <input
          type="measure"
          name="measure"
          placeholder="Medida"
          value={measure}
          onChange={(event) => setMeasure(event.target.value)}
        />
        <input
          type="text"
          name="zone"
          placeholder="Zona"
          value={zone}
          onChange={(event) => setZone(event.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>
    </div>
  )
}

export default ExerciseForm
