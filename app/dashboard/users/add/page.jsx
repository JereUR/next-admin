import React from 'react'

const addUserPage = () => {
  return (
    <div className="bg-gray-800 p-5 rounded-lg mt-5">
      <form action="" className="form-product flex flex-wrap justify-between">
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
          <option value={false} selected>
            Is Admin?
          </option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <select name="isActive" id="isActive">
          <option value={true} selected>
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
          className="w-full p-7 bg-teal-600 text-white rounded-sm cursor-pointer"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default addUserPage
