import * as React from "react"
import { graphql, Link } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import RecortText from '../components/functions/recortText'

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
  const fullContainerImage = {
    height: '100%'
  }
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
        <div className="home-container_gallery container mx-auto px-5 pt-4">
          {
            prismicProducts.map((item, index) => (
              <Link to={'/products/' + item.slug} key={index} className={`home-container__products ${index % 2 === 0 ? 'grid-image_small' : 'grid-image_big'}`} >
                <div className="h-full">
                  <BackgroundImage fluid={item.image_product.localFile.sharp.fluid} class="h-full" style={fullContainerImage} >
                  </BackgroundImage>
                </div>
                <div className="home-container__body h-full w-full flex justify-center items-center">
                  <h3 className={`home-container__title text-5xl ${index % 2 === 0 ? 'md:text-4xl' : 'md:text-6xl'}`}>{RecortText(item.title_product.text, 40)}</h3>
                </div>
              </Link>
            ))
          }
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
