import React from 'react';
import classes from './MenuToggle.module.css';

const MenuToggle = props => {
    const {onToggle, isOpen} = props;
    const cls = [
        classes.MenuToggle,
        'fa'
    ]

    if(isOpen) {
        cls.push('fa-times');
        cls.push(classes.open)
    } else {
        cls.push('fa-bars');
    }

    return(
        <i
            className={cls.join(' ')}
            onClick={onToggle}
        />
    )
}

export default MenuToggle;