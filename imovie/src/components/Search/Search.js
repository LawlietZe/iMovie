import React from 'react';
import { SearchBar, Card, WhiteSpace, Button} from 'antd-mobile';
import axios from 'axios';
import {Link} from 'react-router-dom';
import  './Search.css';

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: '',
            results: null,
            start: 0,
            total: 0,
            moreBtn: false,
            loading: null
          };
        this.loadMoreInfo = this.loadMoreInfo.bind(this);
    }
    loadMoreInfo(){
        this.setState({ loading: true });
        var _started = this.state.start + 20;
        this.setState({ start: _started});
        var _This =this;
        if(_started < this.state.total){
            axios.get(`/v2/movie/search?q=${_This.state.value}&start=${_started}`)
            .then(function (response) {
                console.log(response);
                const updateResults = [
                    ..._This.state.results,
                    ...response.data.subjects
                ];
                _This.setState({ results: updateResults });
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
  componentDidMount() {
    this.autoFocusInst.focus();
  }
  onChange= (value) => {
    this.setState({ value });
  };
  clear = () => {
    this.setState({ value: '' });
  };
  handleClick = () => {
    this.manualFocusInst.focus();
  }
  onSubmit = ()=> {
    let _This = this;
    this.setState({ loading: true });
        this.setState({ moreBtn: true });
        axios.get(`/v2/movie/search?q=${_This.state.value}`)
        .then(function (response) {
            console.log(response);
            _This.setState({ results: response.data.subjects });
            _This.setState({ loading: false });
            _This.setState({ total: response.data.total });
        })
        .catch(function (error) {
            console.log(error);
        });
  }
  render() {
    const {results} = this.state;
    return (
    <div className='SearchContainer'>
      <SearchBar 
        placeholder="输入电影关键字" 
        ref={ref => this.autoFocusInst = ref} 
        value={this.state.value}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
      />
      <WhiteSpace />
        {
            this.state.loading
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
            results &&
            results.map(function(item, index){
                return(
                    <div key = {index} >
                    <WhiteSpace size="lg" />
                    <Card full>
                    <Card.Header
                        title={item.title}
                        thumb="http://img.hb.aicdn.com/f4597a4209cc4205541bcbba461c29615cec89886489-W5nxkt_fw658"
                        extra={<span>出版年:{item.year}</span>}
                    />
                    <Link to={ 
                        {pathname:'/detail',
                        id:item.id }
                    }>
                    <Card.Body>
                        <div><img src={item.images.small} ></img></div>
                        <div>评分:
                            {item.rating.average > 7 ?
                            <span className='highRating' className='highRating'>{item.rating.average}</span>
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
            <span></span>
        }
    </div>);
  }
}
export default Search;
