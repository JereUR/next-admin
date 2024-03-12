import { fetchCustomRoutine } from '@/app/lib/data'

const SingleCustomRoutinePage = async ({ params }) => {
  const { id } = params
  const routine = await fetchCustomRoutine(id)

  return (
    <div>
      <h1>Detalles de la Rutina</h1>
      <p>Nombre: {routine.name}</p>
      <p>Descripción: {routine.description}</p>
      {routine.days.map((day) => (
        <div key={day.day}>
          <h1>{day.day}</h1>
          {day.exercises.map((exercise) => (
            <div key={exercise.id}>
              <p>{exercise.name}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
export default SingleCustomRoutinePage
