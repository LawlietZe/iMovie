import React, { Component } from 'react';
import { Button } from 'antd-mobile'
import IMenu from '../Menu/Menu';
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
                <Button>All Start Here</Button>
            </div>
        );
    }
}
export default Header;
