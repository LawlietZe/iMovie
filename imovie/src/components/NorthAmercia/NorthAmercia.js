import React, { Component } from 'react';
import { Card, WhiteSpace } from 'antd-mobile';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './NorthAmercia.css';

class NorthAmercia extends Component {
    constructor(props){
        super(props);
        this.state = {
            result: null,
            loading: true
        };
    }
    componentDidMount(){
        let _This = this;
        axios.get('/v2/movie/us_box')
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
                            title={item.subject.title}
                            thumb="http://img.hb.aicdn.com/f4597a4209cc4205541bcbba461c29615cec89886489-W5nxkt_fw658"
                            extra={<span>排名:{item.rank}</span>}
                        />
                        <Link to={ 
                            {pathname:'/detail',
                            id:item.subject.id }
                        }>
                        <Card.Body>
                            <div><img alt="movieImage" src={item.subject.images.small} ></img></div>
                            <div>评分:
                                {item.subject.rating.average > 7 ?
                                <span className='highRating'>{item.subject.rating.average}</span>
                                :
                                <span>{item.subject.rating.average}</span>
                                }
                            </div>
                        </Card.Body>
                        </Link>
                        <Card.Footer content={item.subject.original_title} extra={<div>{item.subject.genres[0]}</div>}>
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
export default NorthAmercia;
