<template>
    <v-col class="mobile-sidebar px-0 py-0 pr-md-3 py-md-3" transition="slide-x-reverse-transition" cols=12 md=5 lg=4>
        <v-snackbar absolute :color="snackbarData.color" ref="snackbar" timeout="2000" :top="true" rounded="pill" v-model="snackbarData.snackbar" :multi-line="snackbarData.multiLine">
            {{ snackbarData.text }}
            <template v-slot:action="{ attrs }">
                <v-btn color="white" text v-bind="attrs" @click="snackbarData.snackbar = false"><v-icon>mdi-close</v-icon></v-btn>
            </template>
        </v-snackbar>
        <v-card height="100%" outlined class="py-2 user-card">
<!--            <v-row align="end" v-if="employee.id">-->
<!--                <v-col align-self="start" cols="12">-->
<!--                    <v-row>-->
<!--                        <v-col cols=11 class="px-8 text-left pb-0">-->
<!--                            <v-avatar color="primary" size="50" class="float-left mr-3">-->
<!--                                <span class="white&#45;&#45;text headline">{{avatarText}}</span>-->
<!--                            </v-avatar>-->
<!--                            <h4 class="mb-0 text-md-body-1 text-sm-body-2 mt-3 text-no-wrap">{{employee.first_name}} {{employee.last_name}}</h4>-->
<!--                        </v-col>-->
<!--                    </v-row>-->
<!--                    <v-row>-->
<!--                        <v-col class="px-8 text-left pb-0">-->
<!--                            <p class="mb-2 mt-2"> <v-icon>mdi-email</v-icon> {{employee.email}}</p>-->
<!--                            <p class="mb-2 mt-2"> <v-icon>mdi-email</v-icon> {{employee.phone}}</p>-->
<!--                        </v-col>-->
<!--                    </v-row>-->
<!--                    <v-btn-->
<!--                        color="white"-->
<!--                        icon-->
<!--                        absolute-->
<!--                        top-->
<!--                        right-->
<!--                        @click="onClickCloseButton">-->
<!--                        <v-icon>mdi-close</v-icon>-->
<!--                    </v-btn>-->
<!--                </v-col>-->
<!--            </v-row>-->
            <transition name="fade" mode="out-in">
                <v-divider></v-divider>
            </transition>
            <div class="company-content">
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
            <v-bottom-navigation absolute color="primary" bottom="0" grow>
                <v-btn :to="{name:'EmployeeInfo'}" class="text-decoration-none">
                    <span>Info</span>
                    <v-icon>mdi-account-multiple</v-icon>
                </v-btn>

                <v-btn :to="{name:'EmployeeEdit'}" class="text-decoration-none">
                    <span>Edit</span>
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
            </v-bottom-navigation>
            <v-overlay :value="loader" :opacity="0.5" absolute>
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-overlay>
        </v-card>
    </v-col>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {
        props: [],
        name: "Employee",
        data() {
            return {
                bottomNav: 'accounts',
                dialog: false,
                snackbarData: {
                    multiLine: true,
                    snackbar: false,
                    text: '',
                    color: ''
                },
            }
        },
        components: {},
        computed: {
            ...mapGetters('employee', [
                'employee',
                'loader'
            ]),
            avatarText:{
                get()  {
                    const arr = this.employee.first_name.split(' ')
                    let counter = 0
                    return arr.reduce((result, current) => {
                        return counter++ < 2 ? result + current.charAt(0).toUpperCase() : result;
                    }, "")
                }
            }
        },
        watch: {
            id: function () {
                this.getOneEmployee(this.$props.id)
            }
        },
        methods: {
            ...mapActions('employee', [
                'getOneEmployee',
                'deleteEmployee',
            ]),
            onClickCloseButton()
            {
                this.$router.push({name: 'Companies'})
            },
            clearSnackbarData()
            {
                this.snackbarData = {
                    snackbar: false,
                    text: '',
                    color: ''
                }
            }
        },
        mounted() {
            this.getOneEmployee(this.$props.id)
        }
    }
</script>

<style scoped>

</style>
