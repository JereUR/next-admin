import NavBar from '../ui/dashboard/navbar/NavBar'
import SideBar from '../ui/dashboard/sidebar/SideBar'

const Layout = ({ children }) => {
  return (
    <div>
      <div>
        <SideBar />
      </div>
      <div>
        <NavBar />
        {children}
      </div>
    </div>
  )
}

export default Layout
