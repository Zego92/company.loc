<template>
    <div>
        <v-snackbar absolute top right :color="snackbarData.color" timeout="2000" :top="true" rounded="pill" v-model="snackbarData.snackbar">
            {{ snackbarData.text }}
            <template v-slot:action="{ attrs }">
                <v-btn color="white" text v-bind="attrs" @click="snackbarData.snackbar = false"><v-icon>mdi-close</v-icon></v-btn>
            </template>
        </v-snackbar>
        <v-form ref="form">
            <v-col>
                <v-spacer></v-spacer>
                <v-select
                    return-object
                    :items="companies"
                    item-text="name"
                    item-value="id"
                    v-model="employeeData.companyId"
                    :error-messages="addEmployeeErrorsCompanyId"
                    label="Choose the Company"
                    required/>
            </v-col>
            <v-col>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="employeeData.firstName"
                    :error-messages="addEmployeeErrorsFirstName"
                    label="First Name"
                    type="text"
                    counter
                    dark
                    clearable
                    required/>
            </v-col>
            <v-col>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="employeeData.lastName"
                    :error-messages="addEmployeeErrorsLastName"
                    label="Last Name"
                    type="text"
                    counter
                    dark
                    clearable
                    required/>
            </v-col>
            <v-col>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="employeeData.email"
                    :error-messages="addEmployeeErrorsEmail"
                    label="Email"
                    type="email"
                    counter
                    dark
                    clearable
                    required/>
            </v-col>
            <v-col>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="employeeData.phone"
                    :error-messages="addEmployeeErrorsPhone"
                    label="Phone"
                    type="tel"
                    counter
                    dark
                    clearable
                    required/>
            </v-col>
            <v-col>
                <v-spacer></v-spacer>
                <v-btn class="d-md-inline-block d-sm-block" text color="green" @click="onClickAddNewEmployee">Add</v-btn>
                <v-btn class="d-md-inline-block d-sm-block" text color="red" @click="dialog = false">Close</v-btn>
            </v-col>
        </v-form>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {
        props: ['id'],
        name: "EmployeeEdit",
        data() {
            return {
                employeeData: {
                    companyId: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                },
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
            ...mapGetters('company', [
                'companies'
            ]),
            ...mapGetters('employee', [
                'employee'
            ])
        },
        watch: {},
        methods: {
            ...mapActions('company', [
                'getAllCompanies'
            ]),
            ...mapActions('employee', [
                'getOneEmployee',
                'updateEmployee'
            ])
        },
        mounted() {
            this.getAllCompanies({
                page: 1,
                searchField: ''
            })
        }
    }
</script>

<style scoped>

</style>
