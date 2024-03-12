import { Product, User, CustomRoutine } from './models'
import { connectToDB } from './utils'

export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, 'i')
  const ITEM_PER_PAGE = 4
  try {
    connectToDB()
    const count = await User.find({ username: { $regex: regex } }).count()
    const users = await User.find({ username: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))

    return { users, count }
  } catch (error) {
    throw new Error('Failed to fecth users!')
  }
}

export const fetchUser = async (id) => {
  try {
    connectToDB()
    const user = await User.findById(id)
    return user
  } catch (error) {
    throw new Error('Failed to fecth user!')
  }
}

export const fetchProducts = async (q, page) => {
  const regex = new RegExp(q, 'i')
  const ITEM_PER_PAGE = 4
  try {
    connectToDB()
    const count = await Product.find({ title: { $regex: regex } }).count()
    const products = await Product.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
    return { products, count }
  } catch (error) {
    throw new Error('Failed to fecth products!')
  }
}

export const fetchProduct = async (id) => {
  try {
    connectToDB()
    const product = await Product.findById(id)
    return product
  } catch (error) {
    throw new Error('Failed to fecth product!')
  }
}

export const fetchCustomRoutines = async (q, page) => {
  const regex = new RegExp(q, 'i')
  const ITEM_PER_PAGE = 4
  try {
    connectToDB()
    const count = await CustomRoutine.find({ name: { $regex: regex } }).count()
    const customRoutines = await CustomRoutine.find({ name: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
    return { customRoutines, count }
  } catch (error) {
    throw new Error('Failed to fecth users!')
  }
}

export const fetchCustomRoutine = async (id) => {
  console.log(id)
  try {
    connectToDB()
    const customRoutine = await CustomRoutine.findById(id)
    return customRoutine
  } catch (error) {
    throw new Error('Failed to fecth custom routine!')
  }
}
