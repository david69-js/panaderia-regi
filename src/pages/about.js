import React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo"
import { graphql, Link } from "gatsby";
import { RichText } from "prismic-reactjs";
import ResponsiveImage from "gatsby-image"

export const query = graphql`
query dataAbout {
    allPrismicHome {
      edges {
        node {
          data {
            about_image {
                localFile{
                sharp: childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp_noBase64
                  }
                }
              }
            }
            about_sub_text_content {
              raw
            }
            about_sub_title_content {
              text
            }
            about_text_content {
              raw
            }
            about_title {
              text
            }
          }
        }
      }
    }
  }
  
`
const About = ({ data }) => {

  const {
    data: { about_title, about_sub_title_content, about_text_content, about_image, about_sub_text_content }

  } = data.allPrismicHome.edges[0].node;

  return (
    <Layout path="/about">
      <Seo title="About" />
      <div className="about w-full max-w-full pt-10">
        <div className="about-container container mx-auto px-4">
          <h1 className="about-container__title fAlfa-bold text-center ">{about_title.text}</h1>
          <h2 className="about-container__sub-title fAlfa-medium text-center">{about_sub_title_content.text}</h2>
          <div className="about-container__text-content"><RichText render={about_text_content.raw} /></div>
          <div className="about-container-image flex justify-center items-center">
            <ResponsiveImage
              className="about-container__image-responsive"
              fluid={about_image.localFile.sharp.fluid}
              loading="lazy"
              fadeIn={true} />
          </div>
          <div className="about-container__text-content"><RichText render={about_sub_text_content.raw} /></div>
        </div>
      </div>
    </Layout>
  )

}

export default About