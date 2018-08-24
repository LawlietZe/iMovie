import React, { Component } from 'react';
import { Card, WhiteSpace, Button, WingBlank} from 'antd-mobile';
import {Link} from 'react-router-dom';
import axios from 'axios';
import api from '../../apis'
import './Container.css';

class Container extends Component {
    constructor(props){
        super(props);
        this.state = {
            result: null,
            loading: true,
            start: 0,
            total: 0,
            moreBtn: true
        };
        this.loadMoreInfo = this.loadMoreInfo.bind(this);
    }
    loadMoreInfo(){
        this.setState({ loading: true });
        var _started = this.state.start + 20;
        this.setState({ start: _started});
        var _This =this;
        if(_started < this.state.total){
            axios.get(`/v2/movie/in_theaters?city=上海&start=${_started}`)
            .then(function (response) {
                console.log(response);
                const updateResults = [
                    ..._This.state.result,
                    ...response.data.subjects
                ];
                _This.setState({ result: updateResults });
                _This.setState({ loading: false });
            })
            .catch(function (error) {
                console.log(error);
            });
        }else{
            _This.setState({ loading: false });
            this.setState({ moreBtn: false });
        }   
    }
    componentDidMount(){
        let _This = this;
        axios.get(`${api}/v2/movie/in_theaters?city=上海${_This.state.start}`)
        .then(function (response) {
            console.log(response);
            _This.setState({ result: response.data.subjects });
            _This.setState({ total: response.data.total });
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
            <div  style={{ width: '100%' }}>
                {this.state.loading
                ?
                <WingBlank size="sm">
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
                </WingBlank>
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
                        <Link to={ {pathname:'/detail',
                                    id:item.id }
                            }>
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
                        </Link>
                        <Card.Footer content={item.original_title} extra={<div>{item.genres[0]}</div>}>
                        </Card.Footer>
                        </Card>
                        </div>
                    )
                    })
                }
                {this.state.moreBtn?
                    <Button onClick={()=> this.loadMoreInfo()}>点击加载更多</Button>
                :
                    <Button>已经到底了鸭</Button>
                }
            </div>
        )
    }
}
export default Container;
