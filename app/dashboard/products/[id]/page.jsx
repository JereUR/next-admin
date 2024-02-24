import { updateProduct } from '@/app/lib/actions'
import { fetchProduct } from '@/app/lib/data'
import Image from 'next/image'

const SingleUserPage = async ({ params }) => {
  const { id } = params
  const product = await fetchProduct(id)
  return (
    <div className="flex gap-12 mt-5">
      <div className="w-1/4 bg-gray-800 p-5 rounded-lg font-bold text-gray-300 h-max">
        <div className="w-full h-80 relative rounded-lg overflow-hidden mb-5">
          <Image
            src={product.img ? product.img : '/noproduct.jpg'}
            alt={`${product.title} image`}
            fill
          />
        </div>
        {product.title}
      </div>
      <div className="w-3/4 bg-gray-800 p-5 rounded-lg">
        <form action={updateProduct} className="user-form flex flex-col">
          <input type="hidden" name="id" value={product.id} />
          <label>Name</label>
          <input type="text" name="name" placeholder={product.title} />
          <label>Price</label>
          <input type="text" name="price" placeholder={product.price} />
          <label>Stock</label>
          <input type="text" name="stock" placeholder={product.stock} />
          <label>Color</label>
          <input type="text" name="color" placeholder={product.color} />
          <label>Size</label>
          <input type="text" name="size" placeholder={product.size} />
          <label>Category</label>
          <select
            name="category"
            id="cat"
            className="cursor-pointer"
            defaulValue={product.category}
          >
            <option value="kitchen">Kitchen</option>
            <option value="phone">Phone</option>
            <option value="computer">Computer</option>
          </select>
          <label>Description</label>
          <textarea
            className="w-full"
            name="description"
            placeholder={product.description}
            id="desc"
            rows="4"
          ></textarea>
          <button className="w-full p-5 bg-teal-700 text-white border-none rounded-md cursor-pointer mt-5">
            Update
          </button>
        </form>
      </div>
    </div>
  )
}

export default SingleUserPage
