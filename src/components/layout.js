import * as React from "react"

import "normalize.css"
import "the-new-css-reset/css/reset.css"
import "./layout.css"

export default function Layout({ children }) {

  return (
    <>
      <main>{children}</main>
      <footer id="site-footer">© {new Date().getFullYear()} &middot; Stefan Brechbühl</footer>
    </>
  )
}
