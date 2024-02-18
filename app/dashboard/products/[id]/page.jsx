import Image from 'next/image'

const SingleUserPage = () => {
  return (
    <div className="flex gap-12 mt-5">
      <div className="w-1/4 bg-gray-800 p-5 rounded-lg font-bold text-gray-300 h-max">
        <div className="w-full h-80 relative rounded-lg overflow-hidden mb-5">
          <Image src="/noproduct.jpg" alt="" fill />
        </div>
        Product
      </div>
      <div className="w-3/4 bg-gray-800 p-5 rounded-lg">
        <form action="" className="user-form flex flex-col">
          <label>Name</label>
          <input type="text" name="name" placeholder="Product" />
          <select name="cat" id="cat">
            <option value="kitchen">Kitchen</option>
            <option value="phone">Phone</option>
            <option value="computer">Computer</option>
          </select>
          <label>Price</label>
          <input type="text" name="price" placeholder="$400" />
          <label>Stock</label>
          <input type="text" name="stock" placeholder="51" />
          <label>Color</label>
          <input type="text" name="color" placeholder="Color" />
          <label>Size</label>
          <input type="text" name="size" placeholder="Size" />
          <label>Description</label>
          <textarea
            className="w-full"
            name="description"
            placeholder="Description"
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
