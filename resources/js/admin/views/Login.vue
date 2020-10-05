<template>
    <v-app id="inspire">
        <div class="text-center">
            <v-snackbar :color="snackbarData.color" timeout="2000" :top="true" rounded="pill" v-model="snackbarData.snackbar" :multi-line="snackbarData.multiLine">
                {{ snackbarData.text }}
                <template v-slot:action="{ attrs }">
                    <v-btn color="white" text v-bind="attrs" @click="snackbarData.snackbar = false"><v-icon>mdi-close</v-icon></v-btn>
                </template>
            </v-snackbar>
        </div>
        <v-main>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="12" md="6" lg="4" class="text-center pa-0">
                        <v-card class="elevation-12">
                            <v-toolbar dark flat>
                                <v-row>
                                    <v-col class="d-flex justify-space-around">
                                        <v-toolbar-title class="white--text"> Log In </v-toolbar-title>
                                    </v-col>
                                </v-row>
                            </v-toolbar>
                            <v-card-text>
                                <v-form >
                                    <v-text-field
                                        counter
                                        v-model="loginData.email"
                                        label="Email"
                                        :error-messages="loginErrorsEmail"
                                        prepend-icon="mdi-at"
                                        type="email"/>
                                    <v-text-field
                                        counter
                                        v-model="loginData.password"
                                        label="Password"
                                        :error-messages="loginErrorsPassword"
                                        prepend-icon="mdi-lock"
                                        type="password"/>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn @click.prevent="onClickLoginAdmin" text class="white--text my-5" block >Submit</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {
        props: [],
        name: "Login",
        data() {
            return {
                emailRules: [
                    value => !!value || 'Поле обязательно для заполнения.',
                ],
                passRules: [
                    value => !!value || 'Поле обязательно для заполнения.',
                ],
                isValid: true,
                loginData: {
                    email: '',
                    password: ''
                },
                snackbarData: {
                    multiLine: true,
                    snackbar: false,
                    text: '',
                    color: ''
                }
            }
        },
        components: {},
        computed: {
            ...mapGetters('auth', [
                'loginErrorsEmail',
                'loginErrorsPassword',
            ])
        },
        watch: {},
        methods: {
            ...mapActions('auth', ['login']),
            onClickLoginAdmin()
            {
                this.login(this.loginData)
                    .then((resp) => {
                        this.snackbarData.snackbar = true;
                        this.snackbarData.text = resp.data.message;
                        this.snackbarData.color = 'success';
                        setTimeout(() => {
                            this.clearSnackbarData()
                            this.$router.push({name: 'Dashboard'})
                        }, 2000)
                    })
                    .catch((error) => {
                        this.snackbarData.snackbar = true;
                        this.snackbarData.text = error.response.data.message;
                        this.snackbarData.color = 'red';
                        setTimeout(() => {
                            this.clearSnackbarData()
                        }, 2000)
                    })
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
        }
    }
</script>

<style scoped>

</style>
