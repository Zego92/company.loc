<template>
    <div>
        <v-list-item two-line  v-if="!company.employees.length">
            <v-list-item-content >
                <v-list-item-title>This company dont have any employees</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item two-line v-for="employee in company.employees" :key="employee.id" v-else>
            <v-list-item-content >
                <v-list-item-title>{{employee.first_name}} {{employee.last_name}}</v-list-item-title>
                <v-list-item-subtitle>{{employee.phone}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action-text>{{employee.email}}</v-list-item-action-text>
        </v-list-item>
    </div>

</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {
        props: ['id'],
        name: "CompanyInfo",
        data() {
            return {}
        },
        components: {},
        computed: {
            ...mapGetters('company', [
                'company'
            ])
        },
        watch: {},
        methods: {
            ...mapActions('company', [
                'getOneCompany'
            ])
        },
        mounted() {
            this.getOneCompany(this.$props.id)
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
