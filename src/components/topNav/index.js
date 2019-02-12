import React, { Component } from 'react';
import { Icon, Input, Avatar } from 'antd';
import { getSongUrl } from 'services/api';
import './index.less';
const Search = Input.Search;
// const ipcRenderer = window.require('electron').ipcRenderer;

let ipcRenderer;
let isFullScreen = false;
export default class TopNav extends Component {
  constructor() {
    super();
    this.state = {
      appName: '网易云音乐',
    };
  }
  async handleClick() {
    try {
      // const res = await fetch('http://localhost:4000/song/url?id=33894312');
      let res = await getSongUrl({ id: '33894312' });
      console.log(res)
    } catch(e){}
  }
  componentDidMount() {
    this.handleMinus()
    this.handleFullScreen()
    this.handleClose()
  }
  handleMinus() {
    document.querySelector('.win-minus').addEventListener('click', function() {
      ipcRenderer.send('hide-window', 'hide');
    })
  }
  handleFullScreen() {
    document.querySelector('.win-fullscreen').addEventListener('click', function() {
      if (isFullScreen) {
        ipcRenderer.send('original-window', 'full-screen');
        ipcRenderer.once('original-reply', function(event, arg) {
          isFullScreen = arg
        });
      } else {
        ipcRenderer.send('fullscreen-window', 'full-screen');
        ipcRenderer.once('fullscreen-reply', function(event, arg) {
          isFullScreen = arg
        });
      }
    })
  }
  handleClose() {
    document.querySelector('.win-close').addEventListener('click', function() {
      ipcRenderer.send('window-all-closed', 'closed');
    })
  }
  render() {
    var noDrag = {
      WebkitAppRegion: 'no-drag'
    }
    return (
      <div className="top-nav flex">
        {/* 头部左边 */}
        <div className="header-logo pointer flex flex-align-center">
          <Icon type="google" className="google-icon" />
          <span>{ this.state.appName }</span>
        </div>
        {/* 头部中间偏左 */}
        <div className="header-search" style={noDrag}>
          <Search
            placeholder="搜索音乐，电台，歌单，明星"
            onSearch={value => console.log(value)}
            style={{ width: 300 }}
          />
        </div>
        <div className="flex-1"></div>
        {/* 头部右边 */}
        <div className="header-info flex flex-align-center" style={noDrag}>
          <div className="info-login pointer info-hover" onClick={this.handleClick}>
            <Avatar size={26} icon="user"  style={{ marginRight: 5 }}/>
            <span>未登录</span>
          </div>
          <div className="info-link flex flex-pack-justify">
            <Icon type="skin" className="pointer info-hover"/>
            <Icon type="heart" className="pointer info-hover"/>
            <Icon type="desktop" className="pointer info-hover"/>
            <Icon type="download" className="pointer info-hover"/>
          </div>
          <span style={{ color: '#aaa', marginLeft: 20, marginRight: 20, fontSize: 14 }}>|</span>
          <div className="info-link flex flex-pack-justify">
            <Icon type="fork" className="pointer info-hover"/>
            <Icon type="minus" className="pointer win-minus info-hover" onClick={this.handleMinus}/>
            <Icon type="fullscreen" className="pointer win-fullscreen info-hover" onClick={this.handleFullScreen}/>
            <Icon type="close" className="pointer win-close info-hover" onClick={this.handleClose}/>
          </div>
        </div>
      </div>
    )
  } 
}