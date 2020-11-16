<template>
    <q-card class="card">
        <svg viewBox="0 0 600 400">
            <defs>
                <clipPath id="myclip">
                    <path d=" m22, 22 l45, 44 l45, 66 l66, 22" />
                </clipPath>
            </defs>
        </svg>
        <div class="card-wrapper">
        </div>
<!--            <svg class="card-svg" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100% 100%">-->
<!--                <g transform="translate(-30,30)">-->
<!--                    <path d="M144.7,-218C183.8,-200.1,209.3,-153.6,190.1,-111.5C171,-69.4,107.3,-31.6,87.3,2.9C67.3,37.4,91.1,68.4,93.1,99.1C95.2,129.7,75.5,159.8,49.5,166.6C23.5,173.3,-8.8,156.7,-54.7,156.7C-100.5,156.7,-159.8,173.3,-195.5,156.1C-231.2,138.8,-243.3,87.8,-215.3,52.3C-187.2,16.7,-119.1,-3.3,-100.8,-47.1C-82.4,-90.9,-113.9,-158.6,-105.4,-190.6C-97,-222.5,-48.5,-218.8,2.2,-222.1C52.8,-225.5,105.6,-236,144.7,-218Z"-->
<!--                          fill="url(#myGradient)"/>-->
<!--                </g>-->
<!--                <linearGradient id="myGradient" gradientTransform="rotate(90)">-->
<!--                    <stop offset="50%" stop-color="rgba(104, 23, 255, 0.77)"/>-->
<!--                    <stop offset="90%" stop-color="rgb(174,95,146)"/>-->
<!--                </linearGradient>-->
<!--                <linearGradient id="myGradientback" gradientTransform="rotate(90)">-->
<!--                    <stop offset="50%" stop-color="gold"/>-->
<!--                    <stop offset="90%" stop-color="red"/>-->
<!--                </linearGradient>-->
<!--            </svg>-->
<!--        </div>-->
<!--        <div class="card-banner">{{title}}</div>-->
<!--        <q-card-section class="card-section">-->
<!--            <div class="text-h5 card-count text-grey-14">{{count}}</div>-->
<!--            <p class="card-text">{{subheading}}</p>-->
<!--        </q-card-section>-->



<!--        <div class="card-media">-->
<!--            &lt;!&ndash;            <img :src="require('../../assets/design.png')">&ndash;&gt;-->
<!--            <q-icon :name="icon"></q-icon>-->
<!--        </div>-->

    </q-card>
</template>

<script>
    export default {
        name: "CornerCard",
        props:{
            title:{
                type:String,
                default:"Title",
            },
            subheading:{
                type:String,
                default:"Please give sub heading",
            },
            count:{
                type:Number,
                default:100,
            },
            icon:{
                type:String,
                default:"print",
            }
        }
    }
</script>

<style lang="scss" scoped>
    .card {
        border-radius: 10px;
        position: relative;
        min-width: 220px;
        min-height: 200px;

        &-wrapper {
            background: radial-gradient(circle, rgba(196,121,186,1) 0%, rgba(61,54,226,1) 56%, rgba(196,121,186,1) 100%);
            pointer-events: none;
            right: 0;
            top: 0;
            position: absolute;
            width: 100%;
            height: 100%;
            clip-path: ellipse(50% 88% at 100% 0%);
        }

        &-svg {
            position: absolute;
            width: inherit;
            top: 0;
            right: 0;
            background: rgba(193, 0, 21, 0);
        }

        &-banner {
            position: absolute;
            min-width: 70px;
            height: 40px;
            text-align: center;
            font-size: 1.5rem;
            justify-content: center;
            background: #9a969c;
            padding-top: 3px;
            padding-bottom: 3px;
            padding-left: 20px;
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