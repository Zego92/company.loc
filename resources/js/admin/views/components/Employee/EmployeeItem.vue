<template>
    <v-row>
        <v-snackbar :color="snackbarData.color" timeout="2000" :top="true" rounded="pill" v-model="snackbarData.snackbar" :multi-line="snackbarData.multiLine">
            {{ snackbarData.text }}
            <template v-slot:action="{ attrs }">
                <v-btn color="white" text v-bind="attrs" @click="snackbarData.snackbar = false"><v-icon>mdi-close</v-icon></v-btn>
            </template>
        </v-snackbar>
        <v-col cols="11">
            <v-list-item color="primary" class="text-decoration-none" :to="`/employees/` + id">
                <v-list-item-avatar color="primary">
                    <span class="white--text headline">{{avatarText}}</span>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>{{firstName}} {{lastName}}</v-list-item-title>
                    <v-list-item-subtitle>{{phone}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action-text>{{email}}</v-list-item-action-text>
            </v-list-item>
        </v-col>
        <v-col cols="1">
            <v-list-item>
                <v-dialog persistent v-model="dialog" width="500">
                    <template v-slot:activator="{ on, attrs }">
                        <v-list-item-action>
                            <v-btn
                                v-bind="attrs"
                                v-on="on"
                                color="red"
                                text
                                icon
                                small
                                dark>
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </template>
                    <v-card>
                        <v-card-title class="headline" primary-title>Are u Sure</v-card-title>
                        <v-card-text>The data will be permanently deleted! Are you sure you want to perform this action?
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green" outlined dark small @click="onClickDeleteEmployee(id)">Remove</v-btn>
                            <v-btn color="red" outlined dark small @click="dialog = false">Discard</v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-overlay :value="loader" :opacity="0.5" absolute>
                        <v-progress-circular indeterminate color="primary"></v-progress-circular>
                    </v-overlay>
                </v-dialog>
            </v-list-item>
        </v-col>
    </v-row>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {
        props: [
            'id',
            'firstName',
            'lastName',
            'email',
            'phone',
        ],
        name: "EmployeeItem",
        data() {
            return {
                dialog: false,
                snackbarData: {
                    multiLine: true,
                    snackbar: false,
                    text: '',
                    color: '',
                },
            }
        },
        components: {},
        computed: {
            ...mapGetters('employee', [
                'loader'
            ]),
            avatarText()
            {
                const arr = this.firstName.split(' ');
                let counter = 0;
                return arr.reduce(function (result, current) {
                    return counter++ < 2 ? result + current.charAt(0).toUpperCase() : result;
                }, "")
            }
        },
        watch: {},
        methods: {
            ...mapActions('employee', [
                'deleteEmployee'
            ]),
            onClickDeleteEmployee(id)
            {
                this.deleteEmployee(id)
                    .then((response) => {
                        this.dialog = false;
                        this.snackbarData.snackbar = true;
                        this.snackbarData.text = response.data.message;
                        this.snackbarData.color = 'success';
                        this.$root.$emit('onClickDeleteEmployee')
                        setTimeout(() => {
                            this.clearSnackbarData()
                        }, 2000)
                    })
                    .catch((error) => {
                        this.dialog = true
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
            },
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>
