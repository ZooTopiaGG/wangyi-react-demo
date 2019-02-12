import React, { Component } from 'react';
import Slider from 'components/rightAside/slider';
import List from 'components/rightAside/list';
import { getPersonalized, getDjprogram, getBanner } from 'services/recommend';

class Recommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personalizedList: [],
      djprogramList: [],
      bannerList: []
    }
  }
  _isMounted = false
  async getBannerList() {
    try {
      let res = await getBanner();
      if (res.code === 200) {
        this._isMounted && this.setState({ bannerList: res.banners })
      }
    } catch(e) {
      throw e
    }
  }

  async getPersonalizedList() {
    let res = await getPersonalized();
    if (res.code === 200) {
      this._isMounted && this.setState({ personalizedList: res.result })
    }
  }

  async getDjprogramList() {
    let res = await getDjprogram();
    if (res.code === 200) {
      this._isMounted && this.setState({ djprogramList: res.result })
    }
  }

  componentDidMount() {
    this.getBannerList()
    this.getPersonalizedList()
    this.getDjprogramList()
    this._isMounted = true
  }
  componentWillUnmount() {
    this._isMounted = false
  }
  render () {
    const { personalizedList, djprogramList, bannerList } = this.state
    const options = {
      speed: 5000, // default 5000
      bots: true, // show bots default true
      interval: false, // isopen interval
      imgs: bannerList
    }
    return (
      <div className="recommend">
        <Slider options={options}/>
        <div className="category-recommend">
          <div className="recommend-songs flex flex-pack-justify">
            <span>推荐歌单</span>
            <span className="more">更多 ></span>
          </div>
          <List lists={personalizedList} nums="10"/>
        </div>
        <div className="category-recommend">
          <div className="recommend-songs flex flex-pack-justify">
            <span>主播电台</span>
            <span className="more">更多 ></span>
          </div>
          <List lists={djprogramList} nums="5"/>
        </div>
        <div className="category-recommend">
          <div className="recommend-songs flex flex-pack-justify">
            <span>LOOK直播</span>
            <span className="more">更多 ></span>
          </div>
          {/* <List /> */}
        </div>
      </div>
    )
  }
}

export default Recommend