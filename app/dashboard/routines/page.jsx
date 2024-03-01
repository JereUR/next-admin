import Image from 'next/image'

import localDB from '../../localdb/db_local.json'

const RoutinesPage = () => {
  console.log(localDB.exercises['Abdominales y lumbares'][0].photo)
  return (
    <div>
      <Image
        src={localDB.exercises['Abdominales y lumbares'][0].photo}
        width={40}
        height={40}
        alt={localDB.exercises['Abdominales y lumbares'][0].exercise}
      />
    </div>
  )
}

export default RoutinesPage
