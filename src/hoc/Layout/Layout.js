import React from 'react';
import { Component } from 'react';

export default class Layout extends Component {
    render() {
        return(
            <div>


                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

