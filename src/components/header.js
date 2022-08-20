import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import * as style from "./header.module.css"

const Header = ({ siteTitle }) => (
  <header className={style.header}>
    <nav className={style.menu}>
      <Link to="/" className={style.menuLink}>{siteTitle}</Link>
    </nav>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
