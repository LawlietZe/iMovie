import React, { Component } from 'react';
import { Card, WhiteSpace } from 'antd-mobile';
import axios from 'axios';
import http from '../../server'

let data = [{
    title: "黑泽明的道路",
    image: "https://img3.doubanio.com/view/subject/l/public/s3569841.jpg",
    year : "2011"
},{
    title: "黑泽明的道路",
    image: "https://img3.doubanio.com/view/subject/l/public/s3569841.jpg",
    year : "2011"
}]
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
                        <div>This is content of `Card`</div>
                    </Card.Body>
                    <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
                    </Card>
                    </div>
                )
            })}
            </div>
        )
    }
}
export default Container;
