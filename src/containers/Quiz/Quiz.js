import React, { Component } from 'react';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/Loader/Loader'
import classes from './Quiz.module.css';
import { connect } from 'react-redux';
import { fetchQuizById, quizAnswerClick, retryHandler } from '../../store/actions/quiz';

class Quiz extends Component {  
    componentDidMount() {    
        this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount () {
        this.props.retryHandler()
    }
    
    render() {
        const {quiz, activeQuestion, answerState, isFinished, results, loading, quizAnswerClick, retryHandler} = this.props;
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    {
                        loading || !quiz
                        ? <Loader /> 
                        :isFinished 
                        ?   
                        <>
                            <h1>Ваш результат:</h1>
                            <FinishedQuiz
                                results={results}
                                quiz={quiz}
                                onRetry={retryHandler}
                            />
                        </>
                        : 
                        <>
                            <h1>Насколько хорошо ты меня знаешь:</h1>
                            <ActiveQuiz
                                onAnswerClick={quizAnswerClick}
                                question={quiz[activeQuestion].question}
                                answers={quiz[activeQuestion].answers}
                                quizLength={quiz.length}
                                answerNumber={activeQuestion + 1}
                                state={answerState}
                                />
                        </>
                    }
  
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        results: state.quiz.results, 
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps (dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryHandler: () => dispatch(retryHandler())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)