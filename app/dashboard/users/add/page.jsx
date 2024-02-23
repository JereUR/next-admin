import { addUser } from '@/app/lib/actions'
import React from 'react'

const addUserPage = () => {
  return (
    <div className="bg-gray-800 p-5 rounded-lg mt-5">
      <form
        action={addUser}
        className="form-product flex flex-wrap justify-between"
      >
        <input type="text" placeholder="Username" name="username" required />
        <input type="email" placeholder="Email" name="email" required />
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
        />
        <input type="number" placeholder="Phone" name="phone" />
        <select name="isAdmin" id="isAdmin">
          <option value={false} defaultValue={false}>
            Is Admin?
          </option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <select name="isActive" id="isActive">
          <option value={true} defaultValue={false}>
            Is Active?
          </option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <textarea
          className="w-full"
          name="address"
          placeholder="Address"
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

export default addUserPage
