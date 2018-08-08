import React, { Component } from 'react';
import { Card, WhiteSpace } from 'antd-mobile';
import axios from 'axios';
import http from '../../server'

class Container extends Component {
    constructor(props){
        super(props);
        this.state = {
            result: null
        }
    }
    componentDidMount(){
        let _This = this;
        axios.get('/v2/movie/in_theaters')
        .then(function (response) {
            console.log(response);
            _This.setState({ result: response.data.subjects });
        })
        .catch(function (error) {
        console.log(error);
        });
    }
    render() {
        const {result} = this.state;
        if(!result){
            return null;
        }
        return(
            <div>
            {result.map(function(item, index){
                return (
                    <div key = {index} >
                    <WhiteSpace size="lg" />
                    <Card full>
                    <Card.Header
                        title={item.title}
                        thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                        extra={<span>出版年:{item.year}</span>}
                    />
                    <Card.Body>
                        <div><img src={item.images.small} ></img></div>
                    </Card.Body>
                    <Card.Footer content={item.rating.average} extra={<div>{item.genres[0]}</div>} />
                    </Card>
                    </div>
                )
            })}
            </div>
        )
    }
}
export default Container;
