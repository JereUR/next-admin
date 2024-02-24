import { updateUser } from '@/app/lib/actions'
import { fetchUser } from '@/app/lib/data'
import Image from 'next/image'

const SingleUserPage = async ({ params }) => {
  const { id } = params
  const user = await fetchUser(id)
  return (
    <div className="flex gap-12 mt-5">
      <div className="w-1/4 bg-gray-800 p-5 rounded-lg font-bold text-gray-300 h-max">
        <div className="w-full h-80 relative rounded-lg overflow-hidden mb-5">
          <Image
            src={user.img ? user.img : '/noavatar.png'}
            alt={`${user.username} image`}
            fill
          />
        </div>
        {user.username}
      </div>
      <div className="w-3/4 bg-gray-800 p-5 rounded-lg">
        <form action={updateUser} className="user-form flex flex-col">
          <input type="hidden" name="id" value={user.id} />
          <label>Username</label>
          <input type="text" name="username" placeholder={user.username} />
          <label>Email</label>
          <input type="email" name="email" placeholder={user.email} />
          <label>Password</label>
          <input type="text" name="password" />
          <label>Phone</label>
          <input type="text" name="phone" placeholder={user.phone} />
          <label>Address</label>
          <textarea name="address" placeholder={user.address}></textarea>
          <label>Is Admin?</label>
          <select
            name="isAdmin"
            id="isAdmin"
            className="cursor-pointer"
            defaultValue={user.isAdmin}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <label>Is Active?</label>
          <select
            name="isActive"
            id="isActive"
            className="cursor-pointer"
            defaultValue={user.isActive}
          >
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
