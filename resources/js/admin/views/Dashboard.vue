<template>
    <v-container>
        <v-row class="dashboard-content">
            <v-col class="pa-2 pa-md-3" cols="12" md="6" lg="6">
                <v-card class="mx-auto" outlined >
                    <div class="overline tab-name px-4 pt-3">Companies</div>
                    <v-list-item three-line>
                        <v-list-item-content>
                            <v-list-item-subtitle class="mb-0">
                            </v-list-item-subtitle>
                            <v-list-item-title class="headline mb-1"> <h3>{{companiesCount}}</h3> </v-list-item-title>
                        </v-list-item-content>
                        <v-icon class="" size="60" color="primary">mdi-briefcase</v-icon>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col class="pa-2 pa-md-3" cols="12" md="6" lg="6">
                <v-card class="mx-auto" outlined >
                    <div class="overline tab-name px-4 pt-3">Employees</div>
                    <v-list-item three-line>
                        <v-list-item-content>
                            <v-list-item-subtitle class="mb-0">
                            </v-list-item-subtitle>
                            <v-list-item-title class="headline mb-1"> <h3>{{employeesCount}}</h3> </v-list-item-title>
                        </v-list-item-content>
                        <v-icon class="" size="60" color="primary">mdi-account-multiple</v-icon>
                    </v-list-item>
                </v-card>
                <v-overlay :value="loader"  :opacity="0.5" absolute>
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </v-overlay>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {
        props: [],
        name: "Dashboard",
        data() {
            return {}
        },
        components: {},
        computed: {
            ...mapGetters('dashboard', [
                'companiesCount',
                'employeesCount',
                'loader'
            ])
        },
        watch: {},
        methods: {
            ...mapActions('dashboard', [
                'getCount'
            ])
        },
        mounted() {
            this.getCount();
        }
    }
</script>

<style scoped>

</style>
