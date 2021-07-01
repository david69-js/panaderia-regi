import * as React from "react"
import { graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { RichText } from "prismic-reactjs"
import ResponsiveImage from "gatsby-image"

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
    allSteps: allPrismicStep {
      edges {
        node {
          data {
            steps {
              title_step {
                text
              }
              text_step {
                raw
              }
              image_step {
                localFile {
                  sharp: childImageSharp {
                    fluid(quality: 100) {
                      ...GatsbyImageSharpFluid_withWebp_noBase64
                    }
                  }
                }
              }
              select_position
              color_step
            }
          }
        }
      }
    }
}
`

const IndexPage = ({ data }) => {
  const {
    allSteps,
    home: {
      data: { home_title, home_sub_title, home_image }
    }
  } = data;
  const prismicStep = allSteps.edges.map(({ node }) => node.data)

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
              <h1 className="home-container__title text-6xl md:text-8xl pb-4 md:pb-10">{home_title.text}</h1>
              <h2 className="home-container__sub-title text-3xl md:text-5xl ">{home_sub_title.text}</h2>
            </div>
          </BackgroundImage>
        }
        <div className="steps container max-w-full">
          {
            prismicStep[0].steps.map((step, index) => (
              <div className="steps-container" key={index} style={{ background: `${step.color_step}` }}>
                <div className={`container m-auto block md:grid grid-cols-2 items-center`}>
                  <div className={`steps-container__content py-10 px-5 ${step.select_position === 'Derecha' ? 'col-start-1 col-end-2' : 'col-start-2 col-end-3'}`}>
                    <h3 className="steps-container__title text-center">{step.title_step.text}</h3>
                    <RichText render={step.text_step.raw} />
                  </div>
                  <div className={`steps-container__images ${step.select_position === 'Derecha' ? 'col-start-2 col-end-3' : 'col-start-1 col-end-2 row-start-1 row-end-2'}`}>
                    <ResponsiveImage
                      className="steps-container__images-sigle_image"
                      fluid={step.image_step.localFile.sharp.fluid}
                      loading="lazy"
                      fadeIn={true}
                    />
                  </div>
                </div>
              </div>
            ))
          }
        </div>

      </div>
    </Layout>
  )
}

export default IndexPage
