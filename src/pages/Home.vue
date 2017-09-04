<template>
    <div class='home'>
        <div class='homeBg'>
            <img src="../../static/images/home_img@2x.png" :style="{height:bgHeight,width:bgWidth}"></img>
            <button class="intoStudy" @click="into">进入学习</button>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                bgHeight:document.documentElement.clientHeight +'px',
                bgWidth:document.documentElement.clientWidth +'px',
            }
        },
        mounted(){
            global.code=this.$route.query.code;
            //3s后进入登录界面.
            setTimeout(()=>{
                this.$router.push("/CourseIndex");
                // this.$router.push("Main");
            },3000)
        },
        methods:{
            into:function(){
                this.$router.push("/CourseIndex");
            }
        }
    }
</script>

<style scoped>
    .homeBg{
        position:relative;
    }
    .intoStudy{
        color:#fff;
        bottom:2rem;
        left:35%;
        position:absolute;
        border:0;
        background-color:#86C840;
        width:5rem;
        height:1.5rem;
        border-radius: 0.75rem;
    }
</style>
