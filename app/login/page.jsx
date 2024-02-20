const LoginPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        action=""
        className="form-login bg-gray-800 p-12 rounded-lg flex flex-col justify-center gap-8 items-center"
      >
        <h1 className="text-3xl font-bold">Login</h1>
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button className="p-7 bg-teal-700 text-white border-none cursor-pointer rounded-md w-full">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage
