import React, { Component } from 'react';
import axios from 'axios';
import { Card, WingBlank, NavBar, Icon, Carousel } from 'antd-mobile';
import './Detail.css';
class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.location.id || 26985127,
            result: ''
        }
    }
    componentDidMount(){
        let _This = this;
        axios.get(`/v2/movie/subject/${_This.state.id}`)
        .then(function (response) {
            console.log(response.data);
            _This.setState({ result: response.data });
            _This.setState({ loading: false });
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
                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.props.history.goBack()}
                >iMovie</NavBar>
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
                <div>
                <Card full>
                <Card.Header
                    title={result.title}
                    thumb="http://img.hb.aicdn.com/f4597a4209cc4205541bcbba461c29615cec89886489-W5nxkt_fw658"
                    extra={<span>出版年:{result.year}</span>}
                />
                <Card.Body>
                    <div><img alt="movieImage" src={result.images.small} ></img></div>
                    <div>评分:
                        {result.rating.average > 7 ?
                        <span className='highRating'>{result.rating.average}</span>
                        :
                        <span>{result.rating.average}</span>
                        }
                    </div>
                    <div>导演: 
                        {result.directors.map(function(item,index){
                            return (
                                <span key={index}>{item.name}</span>
                            )
                        })
                        }
                    </div>
                    <div className='profileMsg'><span>简介：</span>{result.summary}</div>
                </Card.Body>
                <Card.Footer content={result.original_title} extra={<div>{result.genres[0]}</div>}>
                </Card.Footer>
                </Card>
                <WingBlank>
                <Carousel className="space-carousel"
                    frameOverflow="visible"
                    cellSpacing={10}
                    slideWidth={0.8}
                    autoplay
                    infinite
                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    afterChange={index => this.setState({ slideIndex: index })}
                    >
                    {result.casts.map((val, index) => (
                        <a
                        key={val.name}
                        // href={val.alt}
                        style={{
                            display: 'block',
                            position: 'relative',
                            top: this.state.slideIndex === index ? -10 : 0,
                            height: this.state.imgHeight,
                            boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
                        }}
                        >
                        <img
                            src={val.avatars.small}
                            alt="val.name"
                            style={{ width: '100%', verticalAlign: 'top' }}
                            onLoad={() => {
                            // fire window resize event to change height
                            window.dispatchEvent(new Event('resize'));
                            this.setState({ imgHeight: 'auto' });
                            }}
                        />
                        </a>
                    ))}
                </Carousel>
                </WingBlank>
                </div>
                }
            </div>
        )
    }
}
export default Detail;
