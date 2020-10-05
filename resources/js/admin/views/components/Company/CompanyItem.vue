<template>
<!--    <v-list-item color="primary" class="text-decoration-none" :to="'/companies/' + id">-->
    <v-list-item color="primary" class="text-decoration-none">
        <v-list-item-avatar color="primary">
            <span class="white--text headline">{{avatarText}}</span>
        </v-list-item-avatar>

        <v-list-item-content>
            <v-list-item-title>{{name}}</v-list-item-title>
            <v-list-item-subtitle>{{website}}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action-text>{{email}}</v-list-item-action-text>
    </v-list-item>
</template>

<script>
    export default {
        props: ['id', 'name', 'email', 'logo', 'website'],
        name: "CompanyItem",
        data() {
            return {}
        },
        components: {},
        computed: {
            avatarText()
            {
                const arr = this.logo.split(' ');
                let counter = 0;
                return arr.reduce(function(result, current) {
                    return counter++ < 2 ? result + current.charAt(0).toUpperCase() : result;
                }, "")
            }
        },
        watch: {},
        methods: {
            onClickItem()
            {
                this.$emit('show')
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>
