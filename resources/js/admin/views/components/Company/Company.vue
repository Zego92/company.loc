<template>
    <v-col class="mobile-sidebar px-0 py-0 pr-md-3 py-md-3" transition="slide-x-reverse-transition" cols=12 md=5 lg=4>
        <v-snackbar absolute :color="snackbarData.color" ref="snackbar" timeout="2000" :top="true" rounded="pill" v-model="snackbarData.snackbar" :multi-line="snackbarData.multiLine">
            {{ snackbarData.text }}
            <template v-slot:action="{ attrs }">
                <v-btn color="white" text v-bind="attrs" @click="snackbarData.snackbar = false"><v-icon>mdi-close</v-icon></v-btn>
            </template>
        </v-snackbar>
        <v-card height="100%" outlined class="py-2 user-card">
            <v-row align="end" v-if="user.id">
                <v-col align-self="start" cols="12">
                    <v-row>
                        <v-col cols=11 class="px-8 text-left pb-0">
                            <v-avatar color="primary" size="50" class="float-left mr-3">
                                <span class="white--text headline">{{avatarText}}</span>
                            </v-avatar>
                            <h4 class="mb-0 text-md-body-1 text-sm-body-2 mt-3 text-no-wrap">{{user.fio}}</h4>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="px-8 text-left pb-0">
                            <p class="mb-2 mt-2"> <v-icon>mdi-email</v-icon> {{user.email}}</p>
                            <p class="mb-2 mt-2"> <v-icon>mdi-phone</v-icon> {{user.phone}}</p>
                            <v-dialog persistent v-model="dialog" width="500">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn v-bind="attrs" v-on="on" color="red" outlined small dark >Удалить</v-btn>
                                </template>
                                <v-card>
                                    <v-card-title class="headline" primary-title>Подтвердите действие</v-card-title>
                                    <v-card-text>Данные будут безвозвратно удалены! Вы уверены что хотите выполнить данное действие?</v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="green" outlined dark small @click="onClickDeleteUser(user.id)">Удалить</v-btn>
                                        <v-btn color="red" outlined dark small @click="dialog = false">Отменить</v-btn>
                                    </v-card-actions>
                                </v-card>
                                <v-overlay :value="deleteUserLoading" :opacity="0.5" absolute>
                                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                                </v-overlay>
                            </v-dialog>
                        </v-col>
                    </v-row>
                    <v-btn color="white" icon absolute top right @click="onClickCloseButton"> <v-icon>mdi-close</v-icon> </v-btn>
                </v-col>
            </v-row>
            <transition name="fade" mode="out-in">
                <v-divider></v-divider>
            </transition>
            <div class="user-content">
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
            <v-bottom-navigation absolute color="primary" bottom="0" grow>
                <v-btn :to="{name:'UserInfo'}" class="text-decoration-none">
                    <span>Info</span>
                    <v-icon>mdi-account-multiple</v-icon>
                </v-btn>

                <v-btn :to="{name:'UserEdit'}" class="text-decoration-none">
                    <span>Изменить</span>
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
            </v-bottom-navigation>
            <v-overlay :value="userLoading" :opacity="0.5" absolute>
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-overlay>
        </v-card>
    </v-col>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {
        props: ['id'],
        name: "Company",
        data() {
            return {
                bottomNav: 'accounts',
                userLoading: false,
                deleteUserLoading: false,
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
            ...mapGetters('company', [
                'company'
            ]),
            avatarText:{
                get()  {
                    const arr = this.logo.split(' ')
                    let counter = 0
                    return arr.reduce((result, current) => {
                        return counter++ < 2 ? result + current.charAt(0).toUpperCase() : result;
                    }, "")
                }
            }
        },
        watch: {
            id: function () {
                this.getUser()
            }
        },
        methods: {
            ...mapActions('company', [
                'getOneCompany'
            ])
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
