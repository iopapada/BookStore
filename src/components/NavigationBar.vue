// Creating a custom navigation bar 
<template>
    <nav :style="{background: background || '#333'}">
        <ul :style="{background: background || '#333'}" ref="nav">
            <figure class="image-logo" @click="toggleNav">
                <img :src="imagePath" height="80" width="80"/>
            </figure>
            <li
                v-for="(link, index) in navLinks"
                :key="index"
                @mouseenter="$event.currentTarget.style.background = hoverBackground || '#999'"
                @mouseleave="$event.currentTarget.style.background = background || '#333'"
            >
                <router-link 
                    :to="link.path" 
                    :style="{color: linkColor || '#DDD'}"
                >
                    {{ link.text }}
                    <i :class="link.icon" />
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>

export default {
    //name: 'NavigationBar-Menu',
    props: ['navLinks', 'background', 'linkColor', 'hoverBackground', 'imagePath'],
    methods: {
        toggleNav(){
            const nav = this.$refs.nav.classList
            nav.contains('active')?nav.remove('active'):nav.add('active')
        }
    }
}
</script>

<style scoped lang="scss">
nav {
    height:100px;
    width:100%;
    box-shadow: 1px 1px 1px #333;

    ul {
        display: flex;
        height: 100%;
        //align-content: right;
        align-items: center;
        margin-block-start: 0;
        margin-block-end: 0;
        padding-inline-start: 0;
        box-shadow: 1px 1px 1px #333;

        figure {
            cursor: pointer;
            margin-right: 10px;
        }

        a {
            text-decoration: none;
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
        }

        i {
            margin-right: 10px;
            font-size: 20px;
        }

        li {
            list-style-type: none;
            padding: 10px 20px;
        }
    }
}

@media screen and (max-width: 759px){
    nav {
        ul {
            position: absolute;
            width: 180px;
            flex-direction: column;
            left:-120px;
            //height: 100%;
            transition: 300ms ease all;
            top: 99px;
            &.active {
                left: 0px;
            }

            figure {
                position: fixed;
                z-index: 1;
                top: 10px;
                left: 2px;
            }

            li {
                width: 100%;
                padding-left: 0;
                padding-right: 0;
            }

            a {
                flex-direction: row;
                margin-left: 20px;
                justify-content: space-between;
                margin-right: 10px;
            }
        }
    }
}
</style>