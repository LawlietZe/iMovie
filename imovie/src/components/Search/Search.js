import React, { Component } from 'react';
import { SearchBar, Card, WhiteSpace} from 'antd-mobile';
import axios from 'axios';
import  './Search.css';
import api from '../../apis'

class Search extends React.Component {
  state = {
    value: '',
    results: null
  };
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
    axios.get(`${api}/v2/movie/search?q=${_This.state.value}`)
        .then(function (response) {
            console.log(response);
            _This.setState({ results: response.data.subjects });
            debugger
            _This.setState({ loading: false });
        })
        .catch(function (error) {
            console.log(error);
        });
  }
  render() {
    const {results} = this.state;
    return (<div className='SearchContainer'>
      <SearchBar 
        placeholder="输入电影关键字" 
        ref={ref => this.autoFocusInst = ref}
        value={this.state.value}
        onChange={this.onChange}
        onSubmit={this.onSubmit} 
      />
      <WhiteSpace />
      {results &&
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
            <Card.Footer content={item.original_title} extra={<div>{item.genres[0]}</div>}>
            </Card.Footer>
            </Card>
            </div>
            )
        })
    }
    </div>);
  }
}
export default Search;

