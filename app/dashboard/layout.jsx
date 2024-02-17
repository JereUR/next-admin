import Footer from '../ui/dashboard/footer/Footer'
import NavBar from '../ui/dashboard/navbar/NavBar'
import SideBar from '../ui/dashboard/sidebar/SideBar'

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-1/5 bg-gray-800 p-5 min-h-screen">
        <SideBar />
      </div>
      <div className="w-4/5 p-5">
        <NavBar />
        {children}
        <Footer />
      </div>
    </div>
  )
}

export default Layout
