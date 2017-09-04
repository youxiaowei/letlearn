<template>
    <div class="course-info">
         <router-link :to="{name: 'CourseDetail', query: {courseId: coursePK}}" class="course-link" > 
        <div class="course-img">
            <img :src="src" alt="" @error='changeImage($event)'>
        </div>
        <div class="about-course">
            <p class="course-name">{{ courseName }}</p>
            <p class="lecturerInfo">
                <span class="lecturerName">讲师:
                    <span>{{lecturerName}}</span>
                </span>
            </p>
            <p class="promulgateTime">
                <span>{{promulgateTime}}</span>
            </p>
            <p class="videoInfo">
                <span class="playNums">
                    <img src="../../static/images/player.svg"></img>{{playNum}}</span>
                <span class="likesNums">
                    <img src="../../static/images/likes.svg"></img> {{likesNum}}</span>
                <span class="commentNums">
                    <img src="../../static/images/comments.svg"></img> {{commentNum}}</span>
            </p>
        </div>
         </router-link> 
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    props: ['coursePK', 'src', 'courseName', 'lecturerName', 'promulgator', 'promulgateTime', 'playNum', 'likesNum', 'commentNum'],
    methods: {
        //设置图片加载不出来,或者图片本身不存在时 对应的图片
        changeImage(event) {
            var target = event.target;
            target.src = "../static/images/lesson-default.svg"
            console.log(target.src)
        }
    }
}
</script>
<style scoped>
.course-info {
     position: relative; 
    text-align: left;
       /* background-color:aqua;    */
    /* margin-top: 0.5rem; */
    min-height: 5.5rem;
    border-bottom: 1px solid #e5e5e5;
    overflow: hidden;
}

.course-info .course-link {
    color: #000;
}

.course-info .course-img {
    position: absolute;
    top: 0;
    left: 0; 
    width: 35%;
    /* min-height: 80%;   */
    display: inline-block;
}

.course-info .course-img img {
     margin-top:0.75rem;
     margin-left:0.5rem;
    height: 4rem;
    width:5rem;
}

.about-course {
    margin-left:38%;
    padding-top:0.25rem;
    min-height:5rem;
    /* background-color:blueviolet;     */
     padding-left:0.3rem; 
     /* margin-right:0.5rem; */
    width:60%;
    text-align: left;
    display: inline-block;
}

.about-course p {
    margin: 0.25rem 0;
}

.course-info .course-link .course-name {
    min-height: 1rem;
    max-height: 2rem;
    text-align: left;
}

.course-info .lecturerInfo,
.course-info .promulgateTime,
.course-info .videoInfo {
    min-height: 0.5rem;
    font-size: 0.6rem;
    color: #b5b5b5;
    text-align: left;
}

.lecturerInfo .lecturerName {
    margin-right: 0.25rem;
}

.videoInfo span {
    margin-right: 0.25rem;
}

.videoInfo .playNums img,
.videoInfo .likesNums img,
.videoInfo .commentNums img {
    margin-right: 0.25rem;
    width: 0.5rem;
    height: 0.5rem;
}
</style>