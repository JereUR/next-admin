import { useState } from 'react'

const ExerciseForm = ({ dayIndex, handleSubmit }) => {
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
    <form onSubmit={handleSubmitExercise}>
      <input
        type="text"
        placeholder="Nombre del ejercicio"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="number"
        placeholder="Series"
        value={series}
        onChange={(event) => setSeries(event.target.value)}
      />
      <input
        type="number"
        placeholder="Repeticiones/Segundos"
        value={count}
        onChange={(event) => setCount(event.target.value)}
      />
      <input
        type="measure"
        placeholder="Medida"
        value={measure}
        onChange={(event) => setMeasure(event.target.value)}
      />
      <input
        type="text"
        placeholder="Zona (opcional)"
        value={zone}
        onChange={(event) => setZone(event.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  )
}

export default ExerciseForm
