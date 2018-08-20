import React from "react"
import Img from "gatsby-image"

import Layout from "../layouts"
import Container from "../components/container"
import Teaser from "../components/teaser"
import { rhythm } from "../utils/typography"
import constants from "../utils/constants"

const CategoryTemplate = ({ data }) => (
  <Layout data={data}>
    <Container>
      <h1>{data.taxonomyTermTags.name}</h1>

        {data.allNodeArticle.edges.map(({ node }) => (

            <Teaser 
              image={node.relationships.field_image.localFile.childImageSharp.fluid} title={node.title} 
              path={node.path.alias} 
              content={node.body.value}
            />

        ))}
  
    </Container>
  </Layout>
)

export default CategoryTemplate

export const query = graphql`

  query($tid: Int) {

  ...AllTags
  taxonomyTermTags(tid :{ eq: $tid}) {
    tid
    name
  }
   allNodeArticle(filter: {
    relationships : {
      field_tags : {
        tid:{ eq: $tid}
      }
    }
  })  {
     edges {
        node {
          ...ArticleNode
        }
     }
     
    }
  }
`
