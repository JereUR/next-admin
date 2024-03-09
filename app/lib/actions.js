'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import bcrypt from 'bcrypt'

import { Product, User, CustomRoutine } from './models'
import { connectToDB } from './utils'
import { signIn } from '../auth'

export const addUser = async (formData) => {
  const { username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData)

  try {
    connectToDB()
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      isAdmin,
      isActive
    })

    await newUser.save()
  } catch (error) {
    console.log(error)
    throw new Error('Failed to create user!')
  }

  revalidatePath('/dashboard/users')
  redirect('/dashboard/users')
}

export const updateUser = async (formData) => {
  const { id, username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData)

  try {
    connectToDB()
    const updateFields = {
      username,
      email,
      password,
      phone,
      address,
      isAdmin,
      isActive
    }

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === '' || undefined) && delete updateFields[key]
    )

    await User.findByIdAndUpdate(id, updateFields)
  } catch (error) {
    console.log(error)
    throw new Error('Failed to update user!')
  }

  revalidatePath('/dashboard/users')
  redirect('/dashboard/users')
}

export const addProduct = async (formData) => {
  const { title, category, description, price, stock, color, size } =
    Object.fromEntries(formData)

  try {
    connectToDB()

    const newProduct = new Product({
      title,
      category,
      description,
      price,
      stock,
      color,
      size
    })

    await newProduct.save()
  } catch (error) {
    console.log(error)
    throw new Error('Failed to create product!')
  }

  revalidatePath('/dashboard/products')
  redirect('/dashboard/products')
}

export const updateProduct = async (formData) => {
  const { id, title, category, description, price, stock, color, size } =
    Object.fromEntries(formData)

  try {
    connectToDB()
    const updateFields = {
      title,
      category,
      description,
      price,
      stock,
      color,
      size
    }

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === '' || undefined) && delete updateFields[key]
    )

    await Product.findByIdAndUpdate(id, updateFields)
  } catch (error) {
    console.log(error)
    throw new Error('Failed to update product!')
  }

  revalidatePath('/dashboard/products')
  redirect('/dashboard/products')
}

export const deleteProduct = async (formData) => {
  const { id } = Object.fromEntries(formData)

  try {
    connectToDB()

    await Product.findByIdAndDelete(id)
  } catch (error) {
    console.log(error)
    throw new Error('Failed to delete product!')
  }

  revalidatePath('/dashboard/products')
}

export const deleteUser = async (email) => {
  let id = null
  let user = null
  try {
    user = await User.find({ email: email })
    console.log({ user })
  } catch (error) {
    console.log(error)
  }

  id = user[0]._id
  console.log(id)

  try {
    connectToDB()

    await User.findByIdAndDelete(id)
  } catch (error) {
    console.log(error)
    throw new Error('Failed to delete user!')
  }

  revalidatePath('/dashboard/users')
}

export const authenticate = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData)

  try {
    await signIn('credentials', { username, password })
  } catch (error) {
    return 'Wrong Credentials!'
  }
}

export const addCustomRoutine = async (routineData) => {
  const { name, exercises, description } = routineData

  try {
    connectToDB()

    const newCustomRoutine = new CustomRoutine({
      name,
      exercises,
      description
    })

    await newCustomRoutine.save()
  } catch (error) {
    console.log(error)
    throw new Error('Failed to create routine!')
  }

  revalidatePath('/dashboard/routines')
  redirect('/dashboard/routines')
}

export const deleteCustomRoutine = async (formData) => {
  const { id } = Object.fromEntries(formData)

  try {
    connectToDB()

    await CustomRoutine.findByIdAndDelete(id)
  } catch (error) {
    console.log(error)
    throw new Error('Failed to delete routine!')
  }

  revalidatePath('/dashboard/routines')
}
