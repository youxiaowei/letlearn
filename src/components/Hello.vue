<template>
  <div class="hello">
  <mt-header fixed title="固1定顶部"></mt-header>
    <h1>{{ msg }}</h1>
    <button @click="routerTest">路由跳转测试</button>
    <button @click="CourseDetail">课程详情</button>
    <button @click="toast">消息提示框</button>
    <button @click="indicator">加载提示框</button>
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <ul>
        <li v-for="(item,index) in list" style="display:block" :key="index">{{ item }}</li>
      </ul>
    </mt-loadmore>
    <button @click="openAlert">打开alert提示框</button>
    <button @click="confirm">打开confirm提示框</button>
    <button @click="prompt">打开prompt提示框</button>
    <button @click="actionSheet">点击上拉action sheet</button>
    <button @click="popup">弹出popup</button>
    <actions-sheet :actions="actions" v-model="sheetVisible"></actions-sheet>
    <my-popup v-model="popupVisible" popup-transition="popup-fade" modal="true">112</my-popup>
    <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    <mt-switch v-model="value" @change="changeValue">{{isornot}}</mt-switch>
  </div>
</template>

<script>
import { Indicator,Toast,Loadmore,MessageBox,Actionsheet,Popup,Picker,Header,Switch} from 'mint-ui';
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      list:['1','2','3'],
      allLoaded:true,
      actions:[{
        name:'拍照'
      },{
        name:'从相册中选取'
      }],
      sheetVisible:false,
      popupVisible:false,
      slots:[
        {
          flex: 1,
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot1',
          textAlign: 'right'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot3',
          textAlign: 'left'
        }
      ],
      value:false,
      isornot:'否'

    }
  },
  methods:{
    routerTest:function(){
      this.$router.push('/courseIndex');
    },
    CourseDetail:function () {
      this.$router.push('/CourseDetail');
    },
    toast:function(){
      Toast({
        message: '操作成功',
        position: 'center',//位置
        duration: 5000//持续时间
      });
    },
    indicator:function(){
      Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'//加载图标的类型'snake','fading-circle','double-bounce','triple-bounce'
      })
    },
    loadTop:function(){

    },
    loadBottom:function(){

    },
    openAlert:function(){
      MessageBox.alert('操作成功','alert提示');
    },
    confirm:function(){
      MessageBox.confirm('是否删除', '温馨提示').then(action=>MessageBox("删除成功")).catch(action=>MessageBox('取消'));
    },
    prompt:function(){
      MessageBox.prompt('请输入姓名').then(({ value, action }) => {
}).catch(action=>false);
    },
    actionSheet:function(){
      this.sheetVisible=true
    },
    popup:function(){
      this.popupVisible=true
    },
    onValuesChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    changeValue:function(){
      if(this.value){
          this.isornot="是";
      }else{
            this.isornot="否";
      }

    }
  },
  components:{
    'mt-header':Header,
    'mt-loadmore':Loadmore,
    'actions-sheet':Actionsheet,
    'my-popup':Popup,
    'mt-picker':Picker,
    'mt-switch':Switch
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
