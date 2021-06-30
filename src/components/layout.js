/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./shared/header"

const Layout = ({ path, children }) => {
  const data = useStaticQuery(graphql`
  query getHeaderNavigation {
   nav: allPrismicHeader {
      edges {
        node {
          data {
            header_navigation {
              navigation_link
              navigation_name {
                text
              }
            }
          }
        }
      }
    }
  }
  `)

  return (
    <>
      <Header current={path} navigation={data.nav.edges[0].node.data} />
      <div className="pt-12">
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
