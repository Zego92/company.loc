<template>
    <div>
        <v-snackbar absolute :color="snackbarData.color" ref="snackbar" timeout="2000" :top="true" rounded="pill" v-model="snackbarData.snackbar" :multi-line="snackbarData.multiLine">
            {{ snackbarData.text }}
            <template v-slot:action="{ attrs }">
                <v-btn color="white" text v-bind="attrs" @click="snackbarData.snackbar = false"><v-icon>mdi-close</v-icon></v-btn>
            </template>
        </v-snackbar>
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
            <v-dialog persistent v-model="dialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        v-bind="attrs"
                        v-on="on"
                        color="red"
                        @click="onClickDeleteCompany(id)"
                        absolute
                        top
                        right
                        text
                        small
                        dark >
                        <v-icon right color="red" small dark dense >mdi-trash</v-icon>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title class="headline" primary-title>Are u Sure</v-card-title>
                    <v-card-text>The data will be permanently deleted! Are you sure you want to perform this action?</v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green" outlined dark small @click="onClickDeleteCompany(id)">Remove</v-btn>
                        <v-btn color="red" outlined dark small @click="dialog = false">Discard</v-btn>
                    </v-card-actions>
                </v-card>
                <v-overlay :value="loader" :opacity="0.5" absolute>
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </v-overlay>
            </v-dialog>
        </v-list-item>
    </div>

</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {
        props: ['id', 'name', 'email', 'logo', 'website'],
        name: "CompanyItem",
        data() {
            return {}
        },
        components: {

        },
        computed: {
            ...mapGetters('company', [
                'loader'
            ]),
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
            ...mapActions('company', [
                'deleteCompany'
            ]),
            onClickItem()
            {
                this.$emit('show')
            },
            onClickDeleteCompany(id)
            {
                this.deleteCompany(id)
                .then((response) => {

                })
                .catch((error) => {

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
