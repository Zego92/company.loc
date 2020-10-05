<template>
    <v-app>
        <transition name="fade" mode="out-in">
            <component :is="layout">
                <router-view/>
            </component>
        </transition>
    </v-app>
</template>

<script>
    import MainLayout from "./layouts/MainLayout";
    import AuthLayout from "./layouts/AuthLayout";
    export default {
        props: [],
        name: "App",
        data() {
            return {}
        },
        components: {
            MainLayout,
            AuthLayout
        },
        computed: {
            layout() {
                return (this.$route.meta.layout || 'auth') + '-layout';
            }
        },
        watch: {},
        methods: {},
        created () {
            this.$vuetify.theme.dark = true
        },
        mounted() {
        }
    }
</script>

<style scoped>
    #app{
        overflow: hidden;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
        transform: translateX(2em);
    }
    .fade-enter-active, .fade-leave-active{
        transition: all .3s ease;
    }
    html,body {
        overflow: hidden !important;
    }
</style>
