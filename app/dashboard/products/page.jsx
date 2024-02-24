import Link from 'next/link'
import Image from 'next/image'

import Search from '@/app/ui/dashboard/search/Search'
import Pagination from '@/app/ui/dashboard/pagination/Pagination'
import { fetchProducts } from '@/app/lib/data'
import { deleteProduct } from '@/app/lib/actions'

const ProductsPage = async ({ searchParams }) => {
  const q = searchParams?.q || ''
  const page = searchParams?.page || 1
  const { products, count } = await fetchProducts(q, page)
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
                    src={product.img || '/noproduct.jpg'}
                    alt={`product ${product.id} photo`}
                    width={40}
                    height={40}
                  />
                  {product.title}
                </div>
              </td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.createdAt?.toString().slice(4, 16)}</td>
              <td>{product.stock}</td>
              <td>
                <div className="flex gap-2">
                  <Link href={`/dashboard/products/${product.id}`}>
                    <button className="py-1 px-2 rounded-md text-white border-none cursor-pointer bg-teal-700">
                      View
                    </button>
                  </Link>
                  <form action={deleteProduct}>
                    <input type="hidden" name="id" value={product.id} />
                    <button className="py-1 px-2 rounded-md text-white border-none cursor-pointer bg-red-600">
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  )
}

export default ProductsPage
