import { addProduct } from '@/app/lib/actions'
import React from 'react'

const addProductPage = () => {
  return (
    <div className="bg-gray-800 p-5 rounded-lg mt-5">
      <form
        action={addProduct}
        className="form-product flex flex-wrap justify-between"
      >
        <input type="text" placeholder="Title" name="title" required />
        <select name="category" id="cat">
          <option value="general">Choose a Category</option>
          <option value="kitchen">Kitchen</option>
          <option value="phone">Phone</option>
          <option value="computer">Computer</option>
        </select>
        <input type="number" placeholder="Price" name="price" />
        <input type="number" placeholder="Stock" name="stock" />
        <input type="text" placeholder="Color" name="color" />
        <input type="text" placeholder="Size" name="size" />
        <textarea
          className="w-full"
          name="description"
          placeholder="Description"
          id="desc"
          rows="16"
        ></textarea>
        <button
          className="w-full p-7 bg-teal-700 text-white rounded-md cursor-pointer"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default addProductPage
