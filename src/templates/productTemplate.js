import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import SEO from "../components/seo"
export const query = graphql`
query getSlug($slug: String!) {
    single_product:  prismicProducts(uid: {eq: $slug}){
                uid
                data{
                    slug
                title_product {
                    html
                    text
                    raw
                }
                text_product {
                    html
                    text
                    raw
                }
                image_product{
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
}`
const ProductTemplate = ({ data }) => {
    const single_product = data.single_product.data;
    return (
        <Layout>
            <SEO title={single_product.title_product.text} />
            {
                <BackgroundImage fluid={single_product.image_product.localFile.sharp.fluid} alt="test" >
                    TEst
                </BackgroundImage>
            }
            <Link to="/">Go to Home</Link>
        </Layout>
    )
}

export default ProductTemplate