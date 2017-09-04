<template>
  <div id="CourseIndex" ref="CourseIndex">
    <sidebar :sidebarList="sidebarList" v-if="isClickFilter" @closeit="closeMySidebar" @lookAllCourse="showAllCourse" @searchCourse="searchCourse"></sidebar>
    <div class="course">
      <div class="my-header">
        <div class="top-Header">
          <div class="back" @click="backhome">
            <img src="../../static/images/back.svg" alt="">
          </div>
          <div class="mySearch">
            <i class="mintui mintui-search"></i>
            <input type="search" placeholder="请输入课件名称关键字查询" @focus="toSearch">
          </div>
        </div>
        <div class="user-header">
          <div class="avatar">
            <img :src="avatarUrl" alt="">
          </div>
          <div class="header-title">
            <p>课程列表</p>
            <span>当前课程-</span>
            <span>{{currentCourse}}</span>
          </div>
          <div class="filter">
            <div class="filterBtn" @click="myfiltrate">
              <img src="../../static/images/filter.svg" alt="">
              <span>分类</span>
            </div>
          </div>
  
        </div>
  
      </div>
      <div class="course-list">
        <ul>
          <loadmore :autoFill='false' :bottom-method='loadBottom' @bottom-status-change='handleBottomChange' :bottom-all-loaded='allLoaded' ref='loadmore1' :class="{fixheight:isShowFilter}">
            <li v-for="(courseinfo,index) in allCourse" :key="index">
              <cou-info :coursePK='courseinfo.pkCourse' :src='geturl(courseinfo.courseIconUrl)' :courseName="courseinfo.courseName" :lecturerName="courseinfo.courseLecturer" :promulgator="courseinfo.coursePublisher" :promulgateTime="courseinfo.coursePublishTime" :playNum="courseinfo.courseBroadcastNumber" :likesNum="courseinfo.courseLikeNumber" :commentNum="courseinfo.courseLikeNumber">
              </cou-info>
            </li>
            <div slot="bottom" class="mint-loadmore-bottom">
              <span v-show='bottomStatus === "pull"'>↑</span>
              <span v-show='bottomStatus === "drop"'>↓</span>
              <span class='fixed' v-show='bottomStatus === "loading" '>
                <spinner></spinner>
              </span>
            </div>
          </loadmore>
        </ul>
        <span class="tip" v-if="isnull">~~暂无相关课程~~</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Search, Button, Loadmore, Spinner, InfiniteScroll, Toast, Indicator } from 'mint-ui'
import Vue from 'vue'
Vue.use(InfiniteScroll)
import Header from '../components/Header'
import CourseInfo from '../components/CourseInfo'
import sidebar from './Sidebar'
export default {
  name: 'CourseIndex',
  data() {
    return {
      // 侧边栏是否出现
      isShowFilter:'',
      avatarUrl:'../static/images/girl.svg',
      isnull: false,
      //头部是否含有右边的东西
      hasRight: true,
      wrapperHeight: 0,
      //是否全部加载
      allLoaded: false,
      //底部状态（加载更多）
      bottomStatus: '',
      // 控制筛选侧边栏是否显示
      isClickFilter: false,
      // 页数
      pageIndex: 1,
      // 当前分类课程
      currentCourse: "全部课程",
      // 课程名（通过搜索课程名查询）
      courseName: '',
      // 所有课程
      allCourse: [],
      // 侧边栏筛选信息
      sidebarList: [],
      courseTypeIds: '',
       selecteTimeId:''

    }
  },
  //初始化页面
  mounted() {
    var that = this;
    that.courseName = that.$route.query.coursename;
    Indicator.open({
      text: '加载中...',
      spinnerType: 'snake'
    });
    that.axios.get(API + '/Course/SearchCourse', {
      params: {
        code:code,
        pageIndex: that.pageIndex,
        pageSize: 5,
        coursename: that.courseName
      }
    })
      .then(function (response) {
        if (response.data.success === "success") {
          if(response.data.detailMsg.avatar!=null && response.data.detailMsg.avatar!=""){
            that.avatarUrl=response.data.detailMsg.avatar;
          }
          var data = response.data.detailMsg.data.content;
          if (data.length > 0) {
            that.isnull = false;
            that.allCourse = data;
            Indicator.close();
          } else {
            that.allCourse = "";
            that.isnull = true;
            Indicator.close();
          }
        } else {
          Toast("查询失败");
          Indicator.close();
        }


      })
      .catch(function (error) {
        Indicator.close();
        console.log(error);
      });
  },
  methods: {
    geturl: function (data) {
      return BashImgUrl + data;
    },
    // 回到首页
    backhome: function () {
      this.$router.push('/');
    },
    // 点击出现筛选侧边栏
    myfiltrate: function () {
      var that = this;
      that.axios.get(API + '/coursetype/listToC', {
        params:{
          code:code
        }
      })
        .then(function (response) {
          if (response.data.success === "success"){
            that.isClickFilter = true;
            that.isShowFilter=true;
            that.sidebarList = response.data.detailMsg.data.sublist;
          }else{
            Toast("查询失败");
          }
          
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //关闭搜索侧边栏
    closeMySidebar: function () {
      this.isClickFilter = false;
      this.isShowFilter=false;
    },
    // 搜索框获得焦点时，跳转新的页面搜索
    toSearch: function () {
      this.$router.push('/Search');
    },
    //查看全部课程
    showAllCourse: function (...data) {
      this.currentCourse = "全部课程";
      var that = this;
      Indicator.open({
        text: '加载中...',
        spinnerType: 'snake'
      });
      that.axios.get(API + '/Course/SearchCourse', {
        params: {
          code:code,
          pageIndex: that.pageIndex,
          pageSize: 5,
          selecteTimeId:data[0]
        }
      })
        .then(function (response) {
          if (response.data.success === "success") {
            var data = response.data.detailMsg.data.content;
            if (data.length > 0) {
              that.isnull = false;
              that.allCourse = data;
              Indicator.close();
              that.isClickFilter = false;
              that.isShowFilter=true;
            } else {
              that.isnull = true;
              that.allCourse = "";
              Indicator.close();
              that.isClickFilter = false;
              that.isShowFilter=true;
            }
          } else {
            Toast("查询失败");
          }

        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 通过点击侧边栏的某个课程分类筛选
    searchCourse: function (...data) {
      this.currentCourse = data[2];
      this.courseTypeIds=data[0];
      this.selecteTimeId=data[1];
      var that = this;
      Indicator.open({
        text: '加载中...',
        spinnerType: 'snake'
      });
      that.axios.get(API + '/Course/SearchCourse', {
        params: {
          code:code,
          pageIndex: that.pageIndex,
          pageSize: 5,
          courseTypeIds: data[0],
          selecteTimeId:data[1]
        }
      })
        .then(function (response) {
          if (response.data.success === "success") {
            var data = response.data.detailMsg.data.content;
            if (data.length > 0) {
              that.isnull = false;
              that.allCourse = data;
              Indicator.close();
              that.isClickFilter = false;
              that.isShowFilter=true;
            } else {
              that.isnull = true;
              that.allCourse = "";
              Indicator.close();
              that.isClickFilter = false;
              that.isShowFilter=true;
            }
          } else {
            Indicator.close();
            Toast("查询失败");
          }

        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //上拉刷新
    loadBottom(id) {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'snake'
      });
      var that = this;
      that.pageIndex++;
      setTimeout(() => {
        that.axios.get(API + '/Course/SearchCourse', {
          params: {
            code:code,
            pageIndex: that.pageIndex,
            pageSize: 5,
            coursename: that.courseName,
            courseTypeIds: that.courseTypeIds,
            selecteTimeId:that.selecteTimeId

          }
        })
          .then(function (response) {
            if (response.data.success === "success") {
              console.log(response.data.detailMsg.data.content);
              var allCourse = response.data.detailMsg.data.content;
              if (allCourse.length > 0) {
                that.allCourse.push(...allCourse);
                Indicator.close();
              } else {
                Indicator.close();
                let instance = Toast('无更多课程');
                setTimeout(() => {
                  instance.close();
                }, 1000)
                that.allLoaded = true;
              }
            } else {
              Toast("查询失败");
            }

          })
          .catch(function (error) {
            console.log(error);
          });
      }, 1000)
      that.$refs.loadmore1.onBottomLoaded(id);
    },
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
  },
  components: {
    'my-header': Header,
    'mt-button': Button,
    'loadmore': Loadmore,
    'cou-info': CourseInfo,
    Spinner,
    Search,
    sidebar
  }
}
</script>

<style scoped>
.my-header {
  text-align: center;
  color: #fff;
  position: relative;
}

.my-header .top-Header {
  height: 2.5rem;
  text-align: left;
  
}

.back {
  /* margin: 0.5rem; */
  position: absolute;
  top:0.75rem;
  left:0.65rem;
  display: inline-block;
}

.back img {
  width: 1rem;
  height: 1rem;
}

.mySearch {
   margin-top: 0.5rem; 
   margin-left: 1.75rem; 
  display: inline-block;
  width: 80%;
  height:1.5rem;
  line-height: 1.5rem;
  /* padding: 0.25rem 0.25rem; */
  border: 0.05rem solid #fff;
  border-radius: 1rem;
  background-color: #86c840;
}

.mySearch .mintui-search {
position: absolute;
  margin-left: 0.5rem;
  color: #ffffff;
}

.mySearch input {
margin-left:1.5rem;
padding:0.25rem 0;
height:1rem;
  width: 80%;
  text-indent: 0;
  border: 0;
  background-color: #86c840;
  outline: none;
  /* opacity: 0.2; */
}

.mySearch input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #ffffff;
}

.mySearch input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #ffffff;
}

.mySearch input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #ffffff;
}

.mySearch input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #ffffff;
}

.user-header {
  height: 5rem;
  text-align: left;
  position: relative;
  background: #06CF86;
  /* fallback for old browsers */
  background: -webkit-linear-gradient(to top, #06CF86, #86c840);
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #86c840, #86c840);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.user-header .avatar {
  position: absolute;
  text-align: center;
  width: 40%;
  display: inline-block;
}

.user-header .avatar img {
  margin-top: 1rem;
  border-radius: 100%;
  display: inline-block;
  width: 3rem;
  height: 3rem;
}

.user-header .header-title {
  margin-top: 1.5rem;
  margin-left: 40%;
  display: inline-block;
}

.user-header .header-title p {
  font-size: 0.8rem;
}

.user-header .filter {
  position: absolute;
  top: 0.25rem;
  right: 0.5rem;
}

.user-header .filterBtn {
  position: relative;
  font-size: 0.6rem;
  color: #06CF86;
  background-color: #fff;
  border: 0;
  width: 3.25rem;
  height: 1.3rem;
  line-height: 1.4rem;
  border-radius: 0.75rem;
  text-align: center;
  margin: 0.25rem 0 0.5rem 0;
  display: inline-block;
}

.filter img {
  margin-top: 0.2rem;
  left: 0.3rem;
  position: absolute;
  display: inline-block;
  width: 1rem;
  height: 1rem;
}

.filter span {
  color:#86c840;
  margin-left: 1rem;
}

.mint-loadmore {
  width: 100%;
}

a {
  text-decoration: none
}

li {
  list-style: none;
}

.search-input .mint-search {
  height: 2.5rem;
}

.tip {
  display: inline-block;
  margin-top: 2rem;
  text-align: center;
}
.fixheight{
  height: 480px;
}
</style>