import React from 'react';
import AnswerItem from './AnswerItem/AnswerItem';
import classes from './AnswersList.module.css';

const AnswersList = props => {
    const {answers, onAnswerClick, state} = props;
    return(
        <ul className={classes.AnswersList}>
            {answers.map((answer, index) => {
                return (
                    <AnswerItem
                        onAnswerClick={onAnswerClick}
                        key={index}
                        answer={answer}
                        state={state ? state[answer.id] : null}
                    />
                )
            }) }
        </ul>
    )
}

export default AnswersList;