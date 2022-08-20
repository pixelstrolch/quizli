// exports.createPages = async ({ actions: { createPage }, graphql }) => {
//   const data = await graphql(`
//     {
//       allQuizData {
//         edges {
//           node {
//             quizles {
//               quizId
//             }
//             id
//           }
//         }
//       }
//     }
//   `)

//   if (data.errors) {
//     console.log("Error retrieving data", data.errors)
//     return
//   }

//   const quizTemplate = require.resolve("./src/templates/quiz.js")

//   data.data.allQuizData.edges.forEach(node => {
//     createPage({
//       path: `/quiz/${node.quizles.quizId}/`,
//       component: quizTemplate,
//       context: {
//         id: node.id,
//       },
//     })
//   })
// }

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allQuizData {
        edges {
          node {
            quizId
          }
        }
      }
    }
  `)
  data.allQuizData.edges.forEach(edge => {
    const quizId = edge.node.quizId
    actions.createPage({
      path: quizId,
      component: require.resolve(`./src/templates/quiz.js`),
      context: { quizId: quizId },
    })
  })
}