<template>
    <v-container fluid class="fill-height fill-height-main py-0">
        <v-snackbar :color="snackbarData.color" timeout="2000" :top="true" rounded="pill" v-model="snackbarData.snackbar" :multi-line="snackbarData.multiLine">
            {{ snackbarData.text }}
            <template v-slot:action="{ attrs }">
                <v-btn color="white" text v-bind="attrs" @click="snackbarData.snackbar = false"><v-icon>mdi-close</v-icon></v-btn>
            </template>
        </v-snackbar>
        <v-row class="fill-height">
            <v-col max-height="100%" class="px-0 py-0 px-md-3 py-md-3">
                <v-card outlined class="card-content">
                    <v-card-title>
                        <v-col class="py-0 d-none d-md-block" cols="3" lg="3" md="3">
                            Employees
                        </v-col>
                        <v-col class="pa-0" cols="8" lg="8" md="8" sm="10">
                            <v-text-field
                                full-width
                                solo
                                outlined
                                flat
                                v-model="searchField"
                                hide-details
                                label="Search"
                                clearable
                                prepend-inner-icon="mdi-magnify"
                            />
                        </v-col>
                        <v-col cols="2" lg="1" md="1" sm="2" class="ml-auto ml-md-0">
                            <v-dialog v-model="dialog" persistent max-width="600">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon color="green" text class="text-decoration-none" dark v-bind="attrs" v-on="on">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </template>
                                <v-card>
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
                                </v-card>
                                <v-overlay :value="loader" :opacity="0.5" absolute="">
                                    <v-progress-circular indeterminate color=primary></v-progress-circular>
                                </v-overlay>
                            </v-dialog>
                        </v-col>
                    </v-card-title>
                    <div class="scroll-overflow" ref="companyList">
                        <v-card flat height="100%">
                            <v-list two-line subheader>
                                <EmployeeItem
                                    v-for="employee in employees"
                                    :key="employee.id"
                                    :id="employee.id"
                                    :firstName="employee.first_name"
                                    :lastName="employee.last_name"
                                    :email="employee.email"
                                    :phone="employee.phone"
                                />
                                <div class="text-center pagination-wrapper">
                                    <v-pagination v-model="pagination.currentPage" :length="pagination.lastPage" :total-visible="9" circle ></v-pagination>
                                </div>
                                <v-overlay :value="loader" :opacity="0.5" absolute>
                                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                                </v-overlay>
                            </v-list>
                        </v-card>
                    </div>
                </v-card>
            </v-col>
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </v-row>
    </v-container>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import EmployeeItem from "./components/Employee/EmployeeItem";
    export default {
        props: [],
        name: "Employee",
        data() {
            return {
                isShow: true,
                searchField: "",
                dialog: false,
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
        components: {EmployeeItem},
        computed: {
            ...mapGetters('employee', [
                'employees',
                'pagination',
                'loader',
                'addEmployeeErrorsCompanyId',
                'addEmployeeErrorsFirstName',
                'addEmployeeErrorsLastName',
                'addEmployeeErrorsEmail',
                'addEmployeeErrorsPhone',
            ]),
            ...mapGetters('company', [
                'companies'
            ])
        },
        watch: {
            'pagination.currentPage': function () {
                this.getAllEmployees({
                    page: this.pagination.currentPage,
                    searchField: this.searchField
                })
            },
            searchField()
            {
                this.searchField = this.searchField = null ? "" : this.searchField;
                this.getAllEmployees({
                    page: this.pagination.currentPage,
                    searchField: this.searchField
                })
            },
        },
        methods: {
            ...mapActions('employee', [
                'getAllEmployees',
                'addNewEmployee'
            ]),
            ...mapActions('company', [
                'getAllCompanies'
            ]),
            onClickAddNewEmployee()
            {
                this.addNewEmployee(this.employeeData)
                .then((response) => {
                    this.dialog = false;
                    this.snackbarData.snackbar = true;
                    this.snackbarData.text = response.data.message;
                    this.snackbarData.color = 'success';
                    this.$refs.form.reset()
                    setTimeout(() => {
                        this.clearSnackbarData()
                    }, 2000)
                })
                .catch((error) => {
                    this.dialog = true;
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
            this.getAllEmployees({
                page: this.pagination.currentPage,
                searchField: this.searchField
            })
            this.getAllCompanies({
                page: this.pagination.currentPage,
                searchField: this.searchField
            })
            this.$root.$on('onClickDeleteEmployee', () => {
                this.getAllEmployees({
                    page: this.pagination.currentPage,
                    searchField: this.searchField
                })
                this.getAllCompanies({
                    page: this.pagination.currentPage,
                    searchField: this.searchField
                })
            })
            this.$root.$on('onClickUpdateEmployee', () => {
                this.getAllEmployees({
                    page: this.pagination.currentPage,
                    searchField: this.searchField
                })
                this.getAllCompanies({
                    page: this.pagination.currentPage,
                    searchField: this.searchField
                })
            })
        }
    }
</script>

<style scoped>
    .pagination-wrapper
    {
        width: 100%;
    }
    .card-content{
        height: calc(100vh - 90px);
    }
    .scroll-overflow
    {
        height: calc(100vh - 180px);
        overflow-y: auto;
        overflow-x: hidden;
    }
    .content-row{
        position: absolute !important;
        top: 0;
        left: 0;
        height: 100%;
    }
    @media screen and (max-width: 960px) {
        .mobile-sidebar{
            position: absolute !important;
            top: 0;
            left: 0;
            height: 100%;
        }
        .card-content
        {
            height: calc(100vh - 56px);
        }
        .scroll-overflow
        {
            height: calc(100vh - 136px);
        }
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
        transform: translateX(2em);
    }
    .fade-enter-active, .fade-leave-active{
        transition: all .3s ease;
    }
</style>
