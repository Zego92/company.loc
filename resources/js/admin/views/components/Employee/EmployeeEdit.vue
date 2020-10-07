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
                    label="Choose the Company"
                    required/>
            </v-col>
            <v-col>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="employeeData.firstName"
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
                    label="Phone"
                    type="tel"
                    counter
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
            }
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
