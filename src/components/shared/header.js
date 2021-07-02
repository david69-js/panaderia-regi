import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import SearchIcon from "../icons/search";
import SaveIcon from "../icons/save";
import OpenNav from "../icons/openNav";
import CloseIcon from "../icons/close";
import ResponsiveImage from "gatsby-image"
import { OpenNavigation, CloseNavigation } from "../functions/closeAndOpen";

const Header = ({ current = '/', navigation }) => {
  return (
    <header className="fixed z-50 w-full">
      <div className="drowdown block md:hidden h-12 flex justify-between">
        <div className="hamburger my-auto ml-4 h-auto" onClick={OpenNavigation}>
          <OpenNav fill='black' className='OpenNav' />
        </div>
        <div className="close hidden my-auto ml-4 h-auto" onClick={CloseNavigation}>
          <CloseIcon fill='black' className='CloseNav' />
        </div>
        <div className="dropdown-title mx-3 my-auto w-36">
          <ResponsiveImage className="dropdown-logo"
            fluid={navigation.logo_header.localFile.sharp.fluid}
            loading="lazy"
            fadeIn={true} />
        </div>
      </div>
      <div className="header fixed w-full">
        <div className="header-container container mx-auto flex flex-col md:flex-row md:justify-between h-full ">
          <div className="header-container_links w-full md:w-6/12 flex justify-center md:justify-evenly flex-col md:flex-row items-center">
            {
              navigation.header_navigation.map((itemNav, indexNav) => (
                <Link className={`header-container_link m-5 md:m-0 ${current === itemNav.navigation_link ? 'active' : ''}`} key={indexNav} to={itemNav.navigation_link}>{itemNav.navigation_name.text}</Link>
              ))
            }
          </div>
          <div className="header-container-icons w-full md:w-6/12 flex items-center justify-center md:justify-end flex-col md:flex-row">
            <Link to="/" className="px-2 m-5 md:m-0"><SearchIcon fill='#767676' /></Link>
            <Link to="/" className="px-2 m-5 md:m-0"><SaveIcon fill='#767676' className='save-icon' /></Link>
          </div>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  navigation: PropTypes.object,
}

Header.defaultProps = {
  navigation: ``,
}

export default Header
