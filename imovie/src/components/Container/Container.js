import React, { Component } from 'react';
import { Card, WhiteSpace } from 'antd-mobile';
import axios from 'axios';
import './Container.css';

class Container extends Component {
    constructor(props){
        super(props);
        this.state = {
            result: null,
            loading: true
        };
    }
    componentDidMount(){
        let _This = this;
        axios.get('/v2/movie/in_theaters?city=上海')
        .then(function (response) {
            console.log(response);
            _This.setState({ result: response.data.subjects });
            _This.setState({ loading: false });
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    render(){
        const {result} = this.state;
        if(!result){
            return null;
        }
        return(
            <div>
                {this.state.loading
                ?
                <div>
                    <Card full>
                        <Card.Body>
                            <div className="skeleton">
                                <div className="skeleton-head"></div>
                                <div className="skeleton-body">
                                    <div className="skeleton-content"></div>
                                    <div className="skeleton-footer"></div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card full>
                        <Card.Body>
                            <div className="skeleton">
                                <div className="skeleton-head"></div>
                                <div className="skeleton-body">
                                    <div className="skeleton-content"></div>
                                    <div className="skeleton-footer"></div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                :
                result.map(function(item, index){
                    return (
                        <div key = {index} >
                        <WhiteSpace size="lg" />
                        <Card full>
                        <Card.Header
                            title={item.title}
                            thumb="http://img.hb.aicdn.com/f4597a4209cc4205541bcbba461c29615cec89886489-W5nxkt_fw658"
                            extra={<span>出版年:{item.year}</span>}
                        />
                        <Card.Body>
                            <div><img alt="movieImage" src={item.images.small} ></img></div>
                            <div>评分:
                                {item.rating.average > 7 ?
                                <span className='highRating'>{item.rating.average}</span>
                                :
                                <span>{item.rating.average}</span>
                                }
                            </div>
                        </Card.Body>
                        <Card.Footer content={item.original_title} extra={<div>{item.genres[0]}</div>}>
                        </Card.Footer>
                        </Card>
                        </div>
                    )
                    })
                }
            </div>
        )
    }
}
export default Container;
