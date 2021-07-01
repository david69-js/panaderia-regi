import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import RecortText from '../components/functions/recortText'
import { graphql, Link } from "gatsby"
import BackgroundImage from "gatsby-background-image"
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
}
`

const Gallery = ({ data }) => {
    const { allPrismicProducts } = data;
    const prismicProducts = allPrismicProducts.edges.map(({ node }) => node.data)
    const fullContainerImage = {
        height: '100%'
    }
    return (
        <Layout path="/gallery">
            <Seo title="Gallery" />
            <div className="gallery-container container w-full max-w-full">
                <div className="gallery-container_gallery container mx-auto px-5 pt-4">
                    {
                        prismicProducts.map((item, index) => (
                            <Link to={'/products/' + item.slug} key={index} className={`gallery-container__products ${index % 2 === 0 ? 'grid-image_small' : 'grid-image_big'}`} >
                                <div className="h-full">
                                    <BackgroundImage fluid={item.image_product.localFile.sharp.fluid} class="h-full" style={fullContainerImage} >
                                    </BackgroundImage>
                                </div>
                                <div className="gallery-container__body h-full w-full flex justify-center items-center">
                                    <h3 className={`gallery-container__title text-5xl ${index % 2 === 0 ? 'md:text-4xl' : 'md:text-6xl'}`}>{RecortText(item.title_product.text, 40)}</h3>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </Layout>
    )

}

export default Gallery