<template>
    <div id="Siderbar" ref="wrapper">
        <div class="blank" :style="{height:wrapperHeight + 'px'}" @click="closeSidebar"></div>
        <div class="sidebar-content" :style="{height:wrapperHeight + 'px'}">
            <div class="sidebar-list">
                <div class="filtrate">
                    <img src="../../static/images/filter1.svg" alt="">
                    <span>分类</span>
                    <div class="timeChoose">
                       <div id="week" @click="chooseTime($event,this)">
                           <button :class="{selected:isSelected}" class="sub-item">本周</button>
                        </div>
                       <div id="month" @click="chooseTime($event,this)">
                            <button :class="{selected:isSelected}" class="sub-item">本月</button>
                        </div>
                    </div>
                    <button class="all-course" @click="allCourse">全部课程</button>
                </div>
                <div class="scroll" :style="{height:(wrapperHeight-100) + 'px'}">
                    <ul>
                        <li v-for="(item,index) in sidebarList" :key="index" v-if="item.name!='未分类'">
                            <div class="filtrate-name">
                                <img src="../../static/images/icon_1.svg" alt="">
                                <span class="bigtitle">{{item.name}}</span>
                                <!-- <span>(</span>
                                <span>{{item.courseNum}}</span>
                                <span>)</span> -->
                            </div>
                            <ul class="sub">
                                <li v-for="(subitem,index) in item.sublist" :key="index" :id="subitem.id" @click="choose($event,this)">
                                    <button :class="{selected:isSelected}" class="sub-item">{{subitem.name}}</button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="checkbtn">
                    <a class="cancel" @click="closeSidebar">取消</a>
                    <a class="confirm" @click="searchCourse(selectedCourseId)">完成</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Header, Button } from 'mint-ui';
export default {
    props: ['sidebarList'],
    data() {
        return {
            wrapperHeight: 0,
            isSelected: false,
            selectedCourseId: '',
            selecteTimeId:'',
            currentCourse:''
        }
    },
    created() {
    },
    mounted() {
        this.wrapperHeight = document.documentElement.clientHeight;
    },
    methods: {
        closeSidebar: function () {
            this.$emit('closeit');
        },
        choose: function (event) {
            var lis = document.getElementsByClassName("myselected");
            if (lis.length > 0) {
                for (var i = 0; i < lis.length; i++) {
                    lis[i].removeAttribute("class", "myselected");
                }
            }
            var id = event.target.parentElement.id;
            this.selectedCourseId = id;
            this.currentCourse=event.target.innerText;
            document.getElementById(id).setAttribute("class", "myselected");

        },
        chooseTime:function(){
           var lis = document.getElementsByClassName("myselected1");
            if (lis.length > 0) {
                for (var i = 0; i < lis.length; i++) {
                    lis[i].removeAttribute("class", "myselected1");
                }
            }
            var id = event.target.parentElement.id;
            this.selecteTimeId = id;
            document.getElementById(id).setAttribute("class", "myselected1"); 
        },
        allCourse: function () {
            this.$emit('lookAllCourse',this.selecteTimeId);
        },
        searchCourse: function () {
            this.$emit('searchCourse', this.selectedCourseId,this.selecteTimeId,this.currentCourse);
        }
    },
    components: {
        'mt-button': Button
    }
}
</script>
<style scoped>
.timeChoose{
    margin-left:0.25rem;
}
.timeChoose,.timeChoose div{
    display: inline-block;
}
.timeChoose div button{
    text-align: center;
    color: #fff;
    border:0.05rem solid #fff;
    background-color: #06CF86;
    width:2rem;
    height: 1.25rem;
    border-radius: 0.75rem;
    outline: none;
}
.myselected button {
    color: #fff !important;
    background-color: #06CF86 !important;
}
.myselected1 button {
    color: #06CF86 !important;
    background-color: #fff !important;
}
#Siderbar {
    position:fixed;
    z-index:999;
    width: 100%;
    /* background-color: #b5b5b5; */
}

.blank {
    width:15%;
    display: inline-block;
    background-color:#5a5a5a;
    filter:Alpha(Opacity=60);
    opacity:0.6;
}

.sidebar-content {
    position: relative;
    float: right;
    width: 85%;
    background-color: #fff;
}

.filtrate {
    position: relative;
    background-color: #06CF86;
    line-height: 2.5rem;
    height: 2.5rem;
    text-align: left;
    padding: 0.25rem 0.5rem;
}

.filtrate img {
    top: 0.5rem;
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
}

.filtrate span {
    color: #fff;
    font-size: 1rem;
    margin-left: 1.75rem;
}

.filtrate .all-course {
    outline: none;
    text-align: center;
    color: #06CF86;
    border: 0;
    background-color: #fff;
    float: right;
    margin-top: 0.625rem;
    width: 3.5rem;
    height: 1.25rem;
    border-radius: 0.75rem;
}

.scroll {
    overflow: auto;
}

.sidebar-list .scroll>ul>li {
    list-style: none;
    padding-bottom: 0.25rem;
    border-bottom: 1px solid #f5f5f5;
}

.filtrate-name {
    height: 1.25rem;
    line-height: 1.25rem;
    position: relative;
    text-align: left;
    margin-left: 0.5rem;
    padding: 0.5rem 0;
}

.filtrate-name img {
    position: absolute;
    width: 1.25rem;
    height: 1.25rem;
}

.filtrate-name span {
    color: #06CF86;
    font-size: 0.8rem;
}

.filtrate-name .bigtitle {
    margin-left: 1.5rem;
}

.sidebar-list .sub {
    list-style: none;
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
    padding-left: 0.5rem;
}

.sidebar-list .sub li {
    display: inline-block;
}

.sidebar-list .sub li .sub-item {
    color: #656b79;
    background-color: #f6f8fa;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.75rem;
    border: 0;
    box-sizing: border-box;
    display: block;
    outline: 0;
    overflow: hidden;
    position: relative;
    text-align: center;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 0.5rem;
    /* width: 3.5rem; */
    padding:0.25rem;
    min-height: 1.5rem;
}

.checkbtn {
    z-index: 99;
    margin-bottom: 0.25rem;
    width: 100%;
    position: absolute;
    bottom: 0;
}

.checkbtn .cancel {
    height: 1.5rem;
    line-height: 1.5rem;
    width: 42%;
    border-radius: 0.75rem;
    display: inline-block;
    background-color: #f6f8fa;
}

.checkbtn .confirm {
    color: #fff;
    display: inline-block;
    line-height: 1.5rem;
    border-radius: 0.75rem;
    width: 42%;
    height: 1.5rem;
    background-color: #06CF86;
}
</style>