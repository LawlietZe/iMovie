import React, { Component } from 'react';
import IMenu from '../Menu/Menu';
import About from '../About/About';
import TabsComponent from '../Tabs/Tabs';
import {Route } from 'react-router-dom'
class Header extends Component {
    constructor(props) {
        super(props);
        // // 设置 initial state
        // this.state = {
        //     text: props.initialValue || 'placeholder'
        // };

        // // ES6 类中函数必须手动绑定
        // this.handleChange = this.handleChange.bind(this);
    }
    // handleChange(event) {
    //     this.setState({
    //         text: event.target.value
    //     });
    // }
    render() {
        return (
            <div>
                <IMenu></IMenu>
                <Route path="/" component={TabsComponent}></Route>
                <Route path="/about" component={About}></Route>
            </div>
        );
    }
}
export default Header;
