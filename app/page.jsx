import Link from 'next/link'

const Homepage = () => {
  return (
    <div>
      <Link
        className="p-4 flex items-center gap-2 my-1 mx-0 rounded-lg hover:bg-gray-700 "
        href="/dashboard"
      >
        Ir a Dashboard
      </Link>
    </div>
  )
}

export default Homepage
