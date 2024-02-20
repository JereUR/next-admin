import Image from 'next/image'

const SingleUserPage = () => {
  return (
    <div className="flex gap-12 mt-5">
      <div className="w-1/4 bg-gray-800 p-5 rounded-lg font-bold text-gray-300 h-max">
        <div className="w-full h-80 relative rounded-lg overflow-hidden mb-5">
          <Image src="/noavatar.png" alt="" fill />
        </div>
        John Doe
      </div>
      <div className="w-3/4 bg-gray-800 p-5 rounded-lg">
        <form action="" className="user-form flex flex-col">
          <label>Username</label>
          <input type="text" name="username" placeholder="John Doe" />
          <label>Email</label>
          <input type="email" name="email" placeholder="JohnDoe@gmail.com" />
          <label>Password</label>
          <input type="text" name="password" />
          <label>Phone</label>
          <input type="text" name="phone" placeholder="+123456789" />
          <label>Address</label>
          <textarea name="address" placeholder="New York"></textarea>
          <label>Is Admin?</label>
          <select name="isAdmin" id="isAdmin" className="cursor-pointer">
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <label>Is Active?</label>
          <select name="isActive" id="isActive" className="cursor-pointer">
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <button className="w-full p-5 bg-teal-700 text-white border-none rounded-md cursor-pointer mt-5">
            Update
          </button>
        </form>
      </div>
    </div>
  )
}

export default SingleUserPage
