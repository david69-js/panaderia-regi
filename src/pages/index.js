import * as React from "react"
import { graphql, Link } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import ResponsiveImage from "gatsby-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
export const query = graphql`
query {
  allPrismicProducts {
    edges {
      node {
        data {
          slug
          title_product {
            text
          }
          text_product {
            text
          }
          image_product{
						localFile{
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
  }
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
    allPrismicProducts,
    home: {
      data: { home_title, home_sub_title, home_image }
    }
  } = data;
  const prismicProducts = allPrismicProducts.edges.map(({ node }) => node.data)

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
            <div className="home-container__fill">
              <h1 className="home-container__title">{home_title.text}</h1>
              <h2 className="home-container__sub-title">{home_sub_title.text}</h2>
            </div>
          </BackgroundImage>
        }
        <div className=" container mx-auto">
          {
            prismicProducts.map((item, index) => (
              <div key={index} className="home-container__products">
                <Link to={'/products/' + item.slug} className="home-container__products-image" >
                  <BackgroundImage fluid={item.image_product.localFile.sharp.fluid} >
                    <p>{item.text_product.text}</p>
                  </BackgroundImage>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
