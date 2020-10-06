<template>
    <v-list-item two-line >
        <v-list-item-content >
            <v-list-item-title>{{employee.first_name}} {{employee.last_name}}</v-list-item-title>
            <v-list-item-subtitle>{{employee.phone}}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action-text>{{employee.email}}</v-list-item-action-text>
    </v-list-item>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {
        props: ['id'],
        name: "EmployeeInfo",
        data() {
            return {}
        },
        components: {},
        computed: {
            ...mapGetters('employee', [
                'employee'
            ]),
        },
        watch: {},
        methods: {
            ...mapActions('employee', [
                'getOneEmployee'
            ]),
        },
        mounted() {
            this.getOneEmployee(this.$props.id)
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
