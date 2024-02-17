import Link from 'next/link'
import Image from 'next/image'

import Search from '@/app/ui/dashboard/search/Search'
import Pagination from '@/app/ui/dashboard/pagination/Pagination'

const products = [
  {
    id: 1,
    name: 'Iphone',
    img: '/noproduct.jpg',
    description: 'Default description',
    price: '$150',
    date: '13.01.2022',
    stock: '45'
  },
  {
    id: 2,
    name: 'LG Monitor',
    img: '/noproduct.jpg',
    description: 'Default description',
    price: '$190',
    date: '13.01.2022',
    stock: '35'
  },
  {
    id: 3,
    name: 'CPU Intel',
    img: '/noproduct.jpg',
    description: 'Default description',
    price: '$150',
    date: '13.01.2022',
    stock: '41'
  }
]

const ProductsPage = () => {
  return (
    <div className="bg-gray-800 p-5 rounded-lg mt-5">
      <div className="flex items-center justify-between">
        <Search placeholder="Search for a product..." />
        <Link href="/dashboard/products/add">
          <button className="p-2 bg-purple-800 text-white border-none rounded-md cursor-pointer">
            Add New
          </button>
        </Link>
      </div>
      <table className="transactions-table w-full">
        <thead>
          <tr>
            <td>Title</td>
            <td>Description</td>
            <td>Price</td>
            <td>Created At</td>
            <td>Stock</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr className="my-4" key={product.id}>
              <td>
                <div className="flex items-center gap-2">
                  <Image
                    className="rounded-full object-cover"
                    src={product.img}
                    alt={`product ${product.id} photo`}
                    width={40}
                    height={40}
                  />
                  {product.name}
                </div>
              </td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.date}</td>
              <td>{product.stock}</td>
              <td>
                <div className="flex gap-2">
                  <Link href="/">
                    <button className="py-1 px-2 rounded-md text-white border-none cursor-pointer bg-teal-700">
                      View
                    </button>
                  </Link>
                  <button className="py-1 px-2 rounded-md text-white border-none cursor-pointer bg-red-600">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  )
}

export default ProductsPage
