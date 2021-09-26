import React, { Component } from 'react';
import classes from './Layout.module.css';
import MenuToggle from '../../components/UI/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/UI/Navigation/Drawer/Drawer';
import { connect } from 'react-redux';

class Layout extends Component {

    state = { 
        menu: false
    }

    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    render() {
        const {children} = this.props;
        const {menu} = this.state;
        return(
            <div className={classes.Layout}>

                <Drawer 
                    isOpen={menu}
                    onToggle={this.toggleMenuHandler}
                    isAuthenticated={this.props.isAuthenticated}
                />

                <MenuToggle
                    onToggle={this.toggleMenuHandler}
                    isOpen={menu}
                />

                <main>
                    {children}
                </main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}

export default connect(mapStateToProps)(Layout)
