import React, { Component } from 'react'
import classes from './QuizCreator.module.css'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Select from '../../components/UI/Select/Select'
import {createControl, validate, validateForm} from '../../form/formFramework'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import { connect } from 'react-redux'
import { createQuizQuestion, finishCreateQuiz } from '../../store/actions/creator'

function createOptionControl (number) {
    return createControl({
        label: `Вариант ${number}`,
        errorMessage: 'Значение не может быть пустым',
        id: number
    }, {required: true})
}

function createFormControls () {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым'
        }, {required: true}),
        firstOption: createOptionControl(1),
        secondOption: createOptionControl(2),
        thirdOption: createOptionControl(3),
        fouthOption: createOptionControl(4)
    }
}

class QuizCreator extends Component {

    state = {
        isFormValid: false,
        formControls: createFormControls(),
        rightAnswerId: 1,
    }

    submitHandler = (e) => {
        e.preventDefault();
    }

    addQuestionHandler = (e) => {
        e.preventDefault();

        const {question, firstOption, secondOption, thirdOption, fouthOption} = this.state.formControls
        const {createQuizQuestion, quiz} = this.props
        const {rightAnswerId} = this.state

        const questionItem = {
            question: question.value,
            id: quiz.length + 1,
            rightAnswerId,
            answers: [
                {text: firstOption.value, id: firstOption.id},
                {text: secondOption.value, id: secondOption.id},
                {text: thirdOption.value, id: thirdOption.id},
                {text: fouthOption.value, id: fouthOption.id},
            ]
        }

        createQuizQuestion(questionItem)

        this.setState({
            isFormValid: false,
            formControls: createFormControls(),
            rightAnswerId: 1,
        })
    }

    createQuizHandler = e => { 
        const {finishCreateQuiz} = this.props

        e.preventDefault()
  
        this.setState({
            isFormValid: false,
            formControls: createFormControls(),
            rightAnswerId: 1,
        })
        finishCreateQuiz()
    }

    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls}
        const control = { ...formControls[controlName] }

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control;

        this.setState({
            formControls,
            isFormValid: validateForm(formControls) 
        })
    }

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Auxiliary key={controlName + index}>
                    <Input 
                    key={index}
                    label={control.label}
                    value={control.value}
                    valid={control.valid}
                    shouldValidate={!!control.validation}
                    touched={control.touched}
                    errorMessage={control.errorMessage}
                    onChange={e => this.changeHandler(e.target.value, controlName)}
                    required={true}
                    />
                    {
                        index === 0 ? <hr /> : null
                    }
                </Auxiliary>
            )
        })
    }

    selectChangeHandler = (e) => {
       this.setState({
           rightAnswerId: +e.target.value
       })
    }

    render() {
        const select = <Select 
            label="Выберите правильный ответ"
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>

                    <form onSubmit={this.submitHandler}>
                        { this.renderControls() }

                        {select}

                        <Button
                            type="primary"
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Добавить вопрос
                        </Button>
                        <Button
                            type="success"
                            onClick={this.createQuizHandler}
                            disabled={this.props.quiz.length === 0}
                        >
                            Создать тест
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        quiz: state.creator.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)