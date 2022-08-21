import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import * as style from "./header.module.css"

const Header = ({ siteTitle, quizTitle }) => (
  <header className={style.header}>
    <nav className={style.menu}>
      <Link to="/" className={style.link}>{siteTitle}</Link>
    </nav>
    <h1 className={style.quizTitle}>{quizTitle}</h1>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
