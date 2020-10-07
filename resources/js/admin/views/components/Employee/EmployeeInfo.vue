<template>
    <v-list>
        <v-list-item two-line class="mb-3">
            <v-list-item-content>
                <v-list-item-title class="mb-2 font-weight-bold">Company Name</v-list-item-title>
                <v-list-item-subtitle>{{employee.company.name}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action-text>
                <v-btn text small dark color="primary" icon :to="'/companies/' + id">
                    <v-icon>mdi-information-outline</v-icon>
                </v-btn>
            </v-list-item-action-text>
        </v-list-item>
        <v-list-item two-line class="mb-3">
            <v-list-item-content>
                <v-list-item-title class="mb-2 font-weight-bold">Company Email</v-list-item-title>
                <v-list-item-subtitle>{{employee.company.email}}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-list-item two-line class="mb-3">
            <v-list-item-content>
                <v-list-item-title class="mb-2 font-weight-bold">Company WebSite</v-list-item-title>
                <v-list-item-subtitle><a :href="employee.company.website">{{employee.company.website}}</a></v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </v-list>
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
