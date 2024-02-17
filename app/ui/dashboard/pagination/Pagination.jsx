const Pagination = () => {
  return (
    <div className="p-2 flex justify-between">
      <button className="py-1 px-2 bg-gray-700 rounded-md hover:bg-gray-600 cursor-pointer disabled:cursor-not-allowed">
        Previous
      </button>
      <button className="py-1 px-2 bg-gray-700 rounded-md hover:bg-gray-600 cursor-pointer disabled:cursor-not-allowed">
        Next
      </button>
    </div>
  )
}

export default Pagination
