import * as React from "react"
import { graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import Layout from "../components/layout"
import Seo from "../components/seo"


export const query = graphql`
query {
  home: prismicHome {
    data{
    home_title {
      text
    }
    home_sub_title {
      text
    }
      home_image {
        localFile {
                sharp: childImageSharp {
                fluid(quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
      }
    }
}
`

const IndexPage = ({ data }) => {
  const {
    home: {
      data: { home_title, home_sub_title, home_image }
    }
  } = data;

  return (
    <Layout path="/">
      <Seo title="Home" />
      <div className="home-container container w-full max-w-full">
        {
          <BackgroundImage
            Tag="section"
            className="home-container__backgroud-image"
            fluid={home_image.localFile.sharp.fluid}
            fadeIn={true}
          >
            <div className="home-container__fill flex flex-col text-center justify-center">
              <h1 className="home-container__title text-6xl md:text-8xl">{home_title.text}</h1>
              <h2 className="home-container__sub-title text-3xl md:text-5xl">{home_sub_title.text}</h2>
            </div>
          </BackgroundImage>
        }
      </div>
    </Layout>
  )
}

export default IndexPage
