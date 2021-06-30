const path = require("path")

async function createProductDetailsPage(graphql, actions, reporter) {
    const { createPage } = actions

    let result = await graphql(`{
        slug: allPrismicProducts{
           edges {
             node {
                uid
                id
             }
           }
         }
       }
       
    `)

    if (result.errors) {
        reporter.panic(`Failed generating blog post pages`, result.errors)
    }

    const products = (result.data.slug || {}).edges || []

    products.forEach(edge => {
        createPage({
            path: `/products/${edge.node.uid}`,
            component: path.resolve('./src/templates/productTemplate.js'),
            context: {
                slug: edge.node.uid,
            },
        });
    })
}
exports.createPages = async ({ graphql, actions, reporter }) => {
    await createProductDetailsPage(graphql, actions, reporter)
}
