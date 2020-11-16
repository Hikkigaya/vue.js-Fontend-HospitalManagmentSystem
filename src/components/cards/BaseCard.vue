<template>
    <q-card  class="card">
        <div :style="{background:primaryColor}" class="card-wrapper">
        </div>
        <div class="card-banner">{{title}}</div>

        <q-card-section class="card-section">
            <div class="text-h5 card-count text-grey-14">{{count}}</div>
            <p class="card-text">{{subheading}}</p>
        </q-card-section>
        <div class="card-media">
            <q-icon :name="icon"></q-icon>
        </div>
        <div class="card-filters">
            <slot name="filters"></slot>
        </div>
        <div v-if="hover" class="card-hover">
            <slot name="hover"></slot>
        </div>
        <q-inner-loading   :showing="loading">
            <q-spinner-pie  size="50px" color="primary" />
        </q-inner-loading>
    </q-card>
</template>

<script>
    import { colors } from 'quasar'
    export default {
        name: "BaseCard",
        props:{
            title:{
                type:String,
                default:"Title",
            },
            subheading:{
                type:String,
                default:"Please give sub heading",
            },
            icon:{
                type:String,
                default:"print",
            },
            url:{
                type:String,
                default:""
            },
            filters:{
                type:Object,
                default:()=>{
                    return {}
                }

            },
            hover:{
                type:Boolean,
                default:false
            }
        },
        watch:{
            "filters"(){
                this.getCardData()
            }
        },
        data(){
            return{
                loading:true,
                count:0
            }
        },
        computed:{
            primaryColor(){
                return colors.getBrand("primary")
            }
        },
        methods:{
            getCardData(){
                this.loading=true
                let filtersEntries=Object.entries(this.filters).filter(([k,v])=>v!==null)
                this.$TylexApp.request().get(this.$TylexApp.$getRoutePath(this.url),
                    {
                        params:{
                            ...Object.fromEntries(filtersEntries)
                        }
                    }
                ).then(response=>{
                    this.count=response.data.count
                    this.loading=false
                })
            }
        },
        mounted() {
            this.getCardData()
        }
    }
</script>

<style lang="scss" scoped>

    .card {
        border-radius: 10px;
        position: relative;
        min-width: 220px;
        &-cover{
            position: relative;
            width:100%;
            height: 100%;
            top:0;
            left: 0;
            background: white;
        }
        &-filters{
            color: white;
            position: absolute;
            top:0;
            right: 3px;
            z-index: 501;
        }
        &-hover{
            background: rgba(41, 39, 41, 0.63);
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 500;
            left:0;
            top:0;
            opacity: 0;
            transition: all .2s ease-in-out;
            border-bottom-right-radius: 0;
            &:hover{
                opacity: 1;
            }
        }
        &-nav{
            background: red;
            height: 100%;
            position: absolute;
            top:0;
            right: 0;
            width:150px;
            clip-path: polygon(80% 0%, 100% 0%, 100% 25%, 80% 25%);
            transition: all .2s ease-in-out;
             &-close{
                 position: absolute;
                 top:0;
                 right:0;
                 opacity: 0;
             }
            &-open{
                position: absolute;
                top:0;
                right:0;
                opacity: 1;
            }
            &:hover {
                clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
                .card-nav-close{
                    opacity: 1;
                }
                .card-nav-open{
                    opacity: 0;
                }
            }
        }
        &-wrapper {
            background: linear-gradient(0deg, rgb(145,28,130) 0%, rgb(61,54,226) 100%);
            pointer-events: none;
            left: 0;
            top: 0;
            position: absolute;
            width: 100%;
            height: 100%;
            clip-path: ellipse(36% 100% at 100% 36%);
        }

        &-svg {
            position: relative;
            width: inherit;
            top: 0;
            right: 0;
            background: rgba(193, 0, 21, 0);
            clip-path: polygon(73% 0, 46% 16%, 37% 32%, 46% 43%, 54% 56%, 59% 70%, 75% 90%, 85% 96%, 100% 100%, 100% 0%);
            & g{
                transform:translateX(100px) translateY(-50px);
            }
        }

        &-banner {
            position: absolute;
            min-width: 70px;
            height: 40px;
            text-align: center;
            font-size: 1.5rem;
            justify-content: center;
            background: #9a969c;
            padding: 3px 20px;
            top: 5px;
            color: white;
            left: -10px;
            border-radius: 3px 5px 5px 0 !important;

            &:after {
                content: "";
                position: absolute;
                top: 100%;
                left: 0;
                width: 0;
                height: 0;
                border: 0 solid transparent;
                border-top-color: #646464;
                border-width: 9px 0 0 11px;
            }
        }

        &-count {
            margin-top: 10px;
        }

        &-text {
            padding-top: 15px;
            margin-bottom: 3px;
        }

        &-media {
            position: absolute;
            right: 10px;
            top: 50%;
            color:white;
            font-size: 4rem;
            transform: translateY(-50%);


            & img {
                max-width: 70px;
                border-radius: 50%;
            }
        }

        &-section {
            margin-top: 23px;
            display: inline-block;
        }
    }
</style>
