<template>
    <div>
        <transition name="fade" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>

<script>
    export default {
        props: [],
        name: "AuthLayout",
        data() {
            return {}
        },
        components: {},
        computed: {},
        watch: {},
        methods: {},

        mounted() {
        }
    }
</script>

<style scoped>
    .fade-enter, .fade-leave-to {
        opacity: 0;
        transform: translateX(2em);
    }
    .fade-enter-active, .fade-leave-active{
        transition: all .3s ease;
    }
</style>
