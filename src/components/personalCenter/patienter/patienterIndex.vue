<template>
 <div class="wrap">
     <div v-if="noPatient" class="no_patient">
         <img src="../../../../static/imgs/patienter/tdf_family_add.png" alt="">
         <p>您还未添加就诊人</p>
     </div>
     <ul v-else-if="!noPatient" class="patient_list">
         <li>
             <div class="left_box">
                 <p>徐亮</p>
                 <img src="../../../../static/imgs/patienter/tdf_family_line2.png" alt="">
                 <p>18888888888</p>
             </div>
             <div class="right_box">
                 <span>默认</span>
                 <img src="../../../../static/imgs/patienter/tdf_family_yshm.png" alt="">
             </div>
         </li>
         <li>
             <div class="left_box">
                 <p>徐亮</p>
                 <img src="../../../../static/imgs/patienter/tdf_family_line2.png" alt="">
                 <p>18888888888</p>
             </div>
             <div class="right_box">
                 <span>默认</span>
                 <img src="../../../../static/imgs/patienter/tdf_family_yshm.png" alt="">
             </div>
         </li>
         <li>
             <div class="left_box">
                 <p>徐亮</p>
                 <img src="../../../../static/imgs/patienter/tdf_family_line2.png" alt="">
                 <p>18888888888</p>
             </div>
             <div class="right_box">
                 <span>默认</span>
                 <img src="../../../../static/imgs/patienter/tdf_family_yshm.png" alt="">
             </div>
         </li>
     </ul>
     <div class="add_patient" v-if="!noPatient">
         <img src="../../../../static/imgs/patienter/tdf_family_add.png" alt="">
         <p>您已添加3人，还能再添加3人</p>
     </div>
 </div>
</template>

<script>
export default {
    name: 'patienter',
    data() {
        return {
            noPatient: false
        }
    }
}
</script>

<style lang="less" scoped>
.wrap {
    min-width: 320px;
    max-width: 640px;
    margin: 0 auto;
    background-color: #eff4fa;
    height: 100%;
}
.no_patient,.add_patient {
    padding-top: 5.45rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
        height: 4.15rem;
        width: 4.15rem;
    }
    p {
        margin-top: .5rem;
        color: #393939;
        font-size: .65rem;
    }
}
.add_patient {
    margin-top: 1.3rem;
    padding-top: 0;
}
.patient_list {
    padding-top: .6rem;
    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        width: 94%;
        height: 4.5rem;
        margin: 0 auto;
        border-radius: .5rem;
        margin-bottom: .6rem;
        padding: .9rem 0 .9rem .9rem;
        .left_box {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p:first-of-type {
                color: #393939;
                font-size: .9rem;
            }
            img {
                width: .6rem;
                margin: .3rem 0;
            }
            p:last-of-type {
                font-size: .9rem;
                color: #393939;
            }
        }
        .right_box {
            display: flex;
            justify-content: space-between;
            span {
                color: rgb(255,82,82);
                font-size: .7rem;
                margin-right: .3rem;
            }
            img {
                height: 1rem;
                width: 3rem;
            }
        }
    }
}
</style>
