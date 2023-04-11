import * as React from "react"
import { graphql ,Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"


const BlogLink = styled(Link)`
  text-decoration: none;
`

const BlogTitle = styled.h3`
  margin-bottom: 20px;
  color: 'blue';
`


const IndexPage = ({data}) => {
  
  return (
    <Layout>
      <div className={styles.textCenter}>
        <StaticImage
          src="../images/example.png"
          loading="eager"
          width={64}
          quality={95}
          formats={["auto", "webp", "avif"]}
          alt=""
          style={{ marginBottom: `var(--space-3)` }}
        />
        <h1>
          Welcome to <b>Kishky's Thoughts!</b>
        </h1>
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        <div>
          {
            data.allMarkdownRemark.edges.map(({node}) => {
              return (
                <div key={node.id}>
                <BlogLink to={node.fields.slug}>
                  <BlogTitle>{node.frontmatter.title} -- {node.frontmatter.date}</BlogTitle>
                </BlogLink>
                <p>{node.excerpt}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </Layout>
)}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage

export const query = graphql`
  query MyQuery {
    allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
      edges {
        node {
          id
          frontmatter {
            date
            description
            title
          }
          fields {
            slug
          }
          excerpt
        }
      }
      totalCount
    }
  }
`
