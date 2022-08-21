import React, { useState } from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Header from "../components/header"

import * as style from "../components/quiz.module.css"

export default function Quiz({ data }) {
  const quiz = data.quizData
  const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < quiz.questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};
  const image = getImage(quiz.questions[currentQuestion].image)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`}  quizTitle={data.quizData.title} />
      <Layout>
        <article className={style.quiz}>
          {showScore ? (
            <div className={style.quizBox}>
              <div className={style.header}>
                <h2>Das Quiz ist beendet!</h2>
              </div>
              <div className={style.result}>
                <h3>Du hast {score} von maximal {quiz.questions.length} Punkten erreicht.</h3>
                <p><button onClick={() => window.location.reload()}>Quiz neu beginnen</button></p>
              </div>
            </div>
          ) : (
            <div className={style.quizBox}>
              <div className={style.header}>
                <h2 className={style.questionCount}>
                  <span className={style.questionCurrent}>Frage {currentQuestion + 1}</span> von {quiz.questions.length}
                </h2>
              </div>
              <div className={style.qa}>
                <div className={style.questionSection}>
                  <h3 className={style.questionText}>{quiz.questions[currentQuestion].questionText}</h3>
                  <figure className={style.questionImage}>
                    <GatsbyImage 
                      image={image} 
                      alt={quiz.questions[currentQuestion].imageAlt} 
                    />
                    <figcaption>{quiz.questions[currentQuestion].imageCredit}</figcaption>
                  </figure>
                </div>
                <div className={style.answerSection}>
                  {quiz.questions[currentQuestion].answerOptions.map((answerOption) => (
                    <button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </article>
      </Layout>
    </>
  )
}
export const query = graphql`
  query($quizId: String!) {
    site {
      siteMetadata {
        title
      }
    }
    quizData(quizId: { eq: $quizId } ) {
      title
      questions {
        answerOptions {
          answerText
          isCorrect
        }
        questionText
        image {
          childImageSharp {
            gatsbyImageData
          }
        }
        imageAlt
        imageCredit
      }
      quizId      
    }
  }
`