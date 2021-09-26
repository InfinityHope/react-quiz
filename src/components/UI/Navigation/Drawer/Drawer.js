import React, { Component } from 'react';
import classes from './Drawer.module.css';
import { NavLink } from 'react-router-dom'
import Backdrop from '../../Backdrop/Backdrop';

export default class Drawer extends Component {
    renderLinks(links) {
        return links.map((link, index) => {
            return(
                <li key={index}>
                    <NavLink 
                        exact={link.exact} 
                        to={link.to}
                        activeClassName={classes.active}
                        onClick={this.props.onToggle}
                    >{link.label}</NavLink>
                </li>
            )
        })
    }

    render() {
        const {isOpen, onToggle} = this.props
        const cls = [
            classes.Drawer
        ]

        if(isOpen) {
            cls.push(classes.open)
        }

        const links =  []

        if(this.props.isAuthenticated) {
            links.push({to: '/', label: 'Список', exact: true})
            links.push({to: '/quiz-creator', label: 'Создать тест', exact: false})
            links.push({to: '/logout', label: 'Выйти', exact: false})
        } else {
            links.push({to: '/auth', label: 'Авторизация', exact: false},)
        }

        return(
            <>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
                {isOpen ? <Backdrop onClick={onToggle}/> : null}
            </>
            
        )
    }
}