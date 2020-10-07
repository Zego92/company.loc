<template>
    <v-container fluid class="fill-height fill-height-main py-0">
        <v-snackbar :color="snackbarData.color" ref="snackbar" timeout="2000" :top="true" rounded="pill" v-model="snackbarData.snackbar" :multi-line="snackbarData.multiLine">
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
                            Companies
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
                                    <v-form ref="form" enctype="multipart/form-data">
                                        <v-col>
                                            <v-spacer></v-spacer>
                                            <v-text-field
                                                v-model="companyData.name"
                                                :error-messages="addCompanyErrorsName"
                                                label="Name"
                                                type="text"
                                                counter
                                                dark
                                                clearable
                                                required/>
                                        </v-col>

                                        <v-col>
                                            <v-spacer></v-spacer>
                                            <v-text-field
                                                v-model="companyData.email"
                                                :error-messages="addCompanyErrorsEmail"
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
                                                v-model="companyData.website"
                                                :error-messages="addCompanyErrorsWebsite"
                                                label="Website"
                                                type="text"
                                                counter
                                                dark
                                                clearable
                                                required/>
                                        </v-col>
                                        <v-col>
                                            <v-spacer></v-spacer>
                                            <v-text-field
                                                clearable
                                                :error-messages="addCompanyErrorsLogo"
                                                label="Logo"
                                                accept="image/*"
                                                @click='pickFile'
                                                v-model='companyData.imageName'/>
                                            <input title="" type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked">
                                        </v-col>
                                        <v-col>
                                            <v-spacer></v-spacer>
                                            <v-btn class="d-md-inline-block d-sm-block" text color="green" @click="onClickAddNewCompany">Add</v-btn>
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
                                <CompanyItem
                                    v-for="company in companies"
                                    :key="company.id"
                                    :id="company.id"
                                    :name="company.name"
                                    :email="company.email"
                                    :logo="company.logo"
                                    :website="company.website"
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
    import CompanyItem from "./components/Company/CompanyItem";
    import VueTheMask from 'vue-the-mask'
    import {mapActions, mapGetters} from 'vuex'
    import Vue from 'vue'
    Vue.use(VueTheMask);
    export default {
        props: [],
        name: "Company",
        data() {
            return {
                isShow: true,
                searchField: "",
                dialog: false,
                companyData: {
                    name: '',
                    email: '',
                    logo: '',
                    website: '',
                    imageName: '',
                },
                snackbarData: {
                    multiLine: true,
                    snackbar: false,
                    text: '',
                    color: '',
                },
                imageName: '',
                imageFile: '',
                imageUrl: '',
            }
        },
        components: {CompanyItem},
        computed: {
            ...mapGetters('company', [
                'companies',
                'loader',
                'addCompanyErrorsEmail',
                'addCompanyErrorsLogo',
                'addCompanyErrorsName',
                'addCompanyErrorsWebsite',
                'pagination'
            ])
        },
        watch: {
            'pagination.currentPage': function () {
                this.getAllCompanies({
                    page: this.pagination.currentPage,
                    searchField: this.searchField
                })
            },
            searchField()
            {
                this.searchField = this.searchField = null ? "" : this.searchField;
                this.getAllCompanies({
                    page: this.pagination.currentPage,
                    searchField: this.searchField
                })
            },
        },
        methods: {
            ...mapActions('company', [
                'getAllCompanies',
                'addNewCompany'
            ]),
            onClickAddNewCompany()
            {
                this.addNewCompany(this.companyData)
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
            pickFile () {
                this.$refs.image.click ()
            },
            onFilePicked (e) {
                const files = e.target.files;
                if(files[0] !== undefined) {
                    this.companyData.imageName = files[0].name;
                    if(this.companyData.imageName.lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader ();
                    fr.readAsDataURL(files[0]);
                    fr.addEventListener('load', () => {
                        this.companyData.logo = fr.result;
                    })
                }
            },

        },
        mounted() {
            this.getAllCompanies({
                page: this.pagination.currentPage,
                searchField: this.searchField
            })
            this.$root.$on('onClickDeleteCompany', () => {
                this.getAllCompanies({
                    page: this.pagination.currentPage,
                    searchField: this.searchField
                })
            })
            this.$root.$on('onClickUpdateCompany', () => {
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
