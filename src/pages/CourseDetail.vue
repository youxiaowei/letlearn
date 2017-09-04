<template>
  <div id="coursedetail">
    <div class="v-header">
      <!-- <v-head :title="title">
      </v-head> -->
    </div>
    <my-video :sources="video.sources" :options="video.options" @countPlayNum="countPlayNum"></my-video>
    <div class="content">
      <v-detail
        :courseId='courseId'
        :src="src"
        :likeNum="likeNum"
        :detailTitle="detailTitle"
        :introduce="introduce"
        :userSelfIcon="src"
        :commentNum="commentNum"
        :sectionList="allSection"
        @clickLikes="clickLikes"
        :likeImgSrc="likeImgSrc"
       >
      </v-detail>
    </div>
  </div>
</template>
<script scoped>
  import { Loadmore,Spinner,InfiniteScroll, Toast,Indicator } from 'mint-ui'
  import MyVideo from './CourseVideo'
  import Vue from 'vue'
  Vue.use(InfiniteScroll)
  import Header from '../components/Header'
  import Detail from '../components/Detail'
  export default {
    name: 'CourseDetail',
    data() {
      return{
        isclickPlay:false,
        isClikLikes:false,
        //切换点赞图片地址
        likeImgSrc:'',
        courseId:'',
        title:'1 使命',
        src:'',
        //点赞数
        likeNum:0,
        //课程标题
        detailTitle:'',
        //课程介绍
        introduce:'',
        commentNum:3,
        // 视频地址
        video: {
          sources: [{
            src: '',
            type: 'video/mp4'
          }],
          options: {
            autoplay: false,
            volume: 0.6,
            poster: ''
          }
        },
        //  [{
        //   userIcon:'',
        //   userName: 'zhangying',
        //   commentContent: '测试1',
        //   day: '1周前',
        //   like: '0'
        // },
        //   {
        //     userIcon:'',
        //     userName: 'youxiaowei',
        //     commentContent: '测试2',
        //     day: '2周前',
        //     like: '1'
        //   },
        //   {
        //     userIcon:'',
        //     userName: 'yangxueying',
        //     commentContent: '测试3',
        //     day: '3周前',
        //     like: '3'
        //   }],
        allSection:[
        //   {
        //     part:'1',
        //     title:'1 使命'
        // },{
        //     part:'2',
        //     title:'2 愿景'
        // },{
        //     part:'3',
        //     title:'3 用友价值观——用户之友'
        // },{
        //     part:'4',
        //     title:'4 用友价值观——专业奋斗'
        // },{
        //     part:'5',
        //     title:'5 用友价值观——开放创新'
        // },{
        //     part:'6',
        //     title:'6 用友价值观——诚信合作'
        // }
        ]
      }
    },
    mounted(){
    var that = this;
    that.courseId=that.$route.query.courseId;
    Indicator.open({
      text: '加载中...',
      spinnerType: 'snake'
    });
    // 查询课程详情
    that.axios.get(API + '/Course/SearchCourseById', {
      params: {
        code:code,
        courseId:that.courseId,
        useId:''
      }
    })
      .then(function (response) {
        if (response.data.success === "success"){
          var data=response.data.detailMsg.data.result[0];
        // 视频地址
        that.video.sources[0].src=BashImgUrl+data.courseUrl;
        // 视频图片
        that.video.options.poster=BashImgUrl+data.courseIconUrl;
        //课程名
        that.detailTitle=data.courseName;
         //点赞数
        that.likeNum=data.courseLikeNumber;
        //课程介绍
        that.introduce=data.courseIntroduction;
        //是否点赞过
        that.isClikLikes=response.data.detailMsg.data.Likeflag;
        if(that.isClikLikes){
            that.likeImgSrc='../../static/images/likes.svg';
             Indicator.close();
        }else{
          that.likeImgSrc='../../static/images/likes1.svg';
           Indicator.close();
        }
        }else{
          Toast("查询失败");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    methods:{
      //点赞加1
      clickLikes:function(){
        var that = this;
        if(that.isClikLikes){
            return;
        }
        
    
    var id=that.$route.query.courseId;
    that.axios.get(API + '/Course/CourseBehavior', {
      params: {
        code:code,
        courseBehaviorType:'03',
        courseId:id,
        useId:''
      }
    })
      .then(function (response) {
        console.log(response);
        if(response.data.detailMsg.data="操作成功"){
          that.likeImgSrc='../../static/images/likes.svg';
          that.likeNum++;
          that.isClikLikes=true;
        }else{
          Toast("操作失败");
        }
        
       
      })
      .catch(function (error) {
        console.log(error);
      });
      },
      countPlayNum:function(){
        var that = this;
        if(that.isclickPlay){
          return
        }
        var id=that.$route.query.courseId;
    that.axios.get(API + '/Course/CourseBehavior', {
      params: {
        code:code,
        courseBehaviorType:'02',
        courseId:id,
        useId:''
      }
    })
      .then(function (response) {
        if(response.data.detailMsg.data="操作成功"){
            that.isclickPlay=true;
        }else{
          Toast("操作失败");
        }
        
       
      })
      .catch(function (error) {
        console.log(error);
      });
      }
    },
    components:{
      'v-head':Header,
      'v-detail':Detail,
      'loadmore':Loadmore,
       MyVideo
    }
  }
</script>

<style>
</style>
