<template>
    <div>
        <v-snackbar absolute top right :color="snackbarData.color" timeout="2000" :top="true" rounded="pill" v-model="snackbarData.snackbar">
            {{ snackbarData.text }}
            <template v-slot:action="{ attrs }">
                <v-btn color="white" text v-bind="attrs" @click="snackbarData.snackbar = false"><v-icon>mdi-close</v-icon></v-btn>
            </template>
        </v-snackbar>
        <v-form ref="form" v-model="form">
            <v-col>
                <v-spacer></v-spacer>
                <v-select
                    :items="companies"
                    item-text="name"
                    item-value="id"
                    :placeholder="employee.company.name"
                    v-model="employeeData.companyId"
                    :error-messages="updateEmployeeErrorsCompanyId"
                    label="Choose the Company"
                    clearable
                    required/>
            </v-col>
            <v-col>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="employeeData.firstName"
                    :placeholder="employee.first_name"
                    label="First Name"
                    type="text"
                    counter
                    :error-messages="updateEmployeeErrorsFirstName"
                    dark
                    clearable
                    required/>
            </v-col>
            <v-col>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="employeeData.lastName"
                    :placeholder="employee.last_name"
                    label="Last Name"
                    type="text"
                    counter
                    :error-messages="updateEmployeeErrorsLastName"
                    dark
                    clearable
                    required/>
            </v-col>
            <v-col>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="employeeData.email"
                    :placeholder="employee.email"
                    label="Email"
                    type="email"
                    counter
                    :error-messages="updateEmployeeErrorsEmail"
                    dark
                    clearable
                    required/>
            </v-col>
            <v-col>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="employeeData.phone"
                    :placeholder="employee.phone"
                    label="Phone"
                    type="tel"
                    counter
                    :error-messages="updateEmployeeErrorsPhone"
                    dark
                    clearable
                    required/>
            </v-col>
            <v-col>
                <v-spacer></v-spacer>
                <v-btn class="d-md-inline-block d-sm-block" text color="green" @click="onClickUpdateEmployee">Update</v-btn>
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
                form: ''

            }
        },
        components: {},
        computed: {
            ...mapGetters('company', [
                'companies'
            ]),
            ...mapGetters('employee', [
                'employee',
                'updateEmployeeErrorsCompanyId',
                'updateEmployeeErrorsFirstName',
                'updateEmployeeErrorsLastName',
                'updateEmployeeErrorsEmail',
                'updateEmployeeErrorsPhone',
            ])
        },
        watch: {
            form: function () {
                this.$refs.form.reset()
            }
        },
        methods: {
            ...mapActions('company', [
                'getAllCompanies'
            ]),
            ...mapActions('employee', [
                'getOneEmployee',
                'updateEmployee',

            ]),
            onClickUpdateEmployee()
            {
                this.updateEmployee({
                    data: this.employeeData,
                    id: this.$props.id
                })
                .then((response) => {
                    this.updateCompanyLoader = false;
                    this.snackbarData.snackbar = true;
                    this.snackbarData.text = response.data.message;
                    this.snackbarData.color = 'success';
                    this.$refs.form.reset()
                    this.$root.$emit('onClickUpdateEmployee')
                    this.getOneEmployee(this.$props.id)
                    setTimeout(() => {
                        this.clearSnackbarData()
                    }, 2000)
                })
                .catch((error) => {
                    this.updateCompanyLoader = false;
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
            this.getAllCompanies({
                page: 1,
                searchField: ''
            })
            this.getOneEmployee(this.$props.id)
        }
    }
</script>

<style scoped>

</style>
