<template>
    <div>
        <v-snackbar absolute top right :color="snackbarData.color" timeout="2000" :top="true" rounded="pill" v-model="snackbarData.snackbar">
            {{ snackbarData.text }}
            <template v-slot:action="{ attrs }">
                <v-btn color="white" text v-bind="attrs" @click="snackbarData.snackbar = false"><v-icon>mdi-close</v-icon></v-btn>
            </template>
        </v-snackbar>
        <v-form class="px-4" ref="form" v-model="form">
            <v-text-field
                v-model="companyData.name"
                :placeholder="company.name"
                type="text"
                label="Name"
                clearable
                counter class="mb-3"/>
            <v-text-field
                v-model="companyData.email"
                :placeholder="company.email"
                type="email"
                label="Email"
                clearable
                counter
                class="mb-3"/>
            <v-text-field
                v-model="companyData.website"
                :placeholder="company.website"
                type="text"
                label="Website"
                clearable
                counter
                class="mb-3"/>
            <v-text-field
                v-model="companyData.imageName"
                :placeholder="company.logo"
                @click='pickFile'
                type="text"
                label="Logo"
                clearable
                counter
                class="mb-3"/>
            <input
                title=""
                type="file"
                style="display: none"
                ref="image"
                accept="image/*"
                @change="onFilePicked">
            <v-btn
                text
                color="success"
                @click="onClickUpdateCompany"
                :loading="loader"
                :disabled="loader">
                Update
            </v-btn>
        </v-form>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    export default {
        props: ['id'],
        name: "CompanyEdit",
        data() {
            return {
                companyData: {
                    name: '',
                    email: '',
                    logo: '',
                    website: '',
                    imageName: ''
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
                'company',
                'loader'
            ])
        },
        watch: {
            form: function () {
                this.$refs.form.reset()
            }
        },
        methods: {
            ...mapActions('company', [
                'updateCompany',
                'getOneCompany'
            ]),
            onClickUpdateCompany()
            {
                this.updateCompanyLoader = true;
                this.updateCompany({
                    id: this.$props.id,
                    data: this.companyData
                })
                .then((response) => {
                    this.updateCompanyLoader = false;
                    this.snackbarData.snackbar = true;
                    this.snackbarData.text = response.data.message;
                    this.snackbarData.color = 'success';
                    this.$refs.form.reset()
                    this.$root.$emit('onClickUpdateCompany')
                    this.getOneCompany(this.$props.id)
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
                    multiLine: true,
                    snackbar: false,
                    text: '',
                    color: '',
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
            this.getOneCompany(this.$props.id)
        }
    }
</script>

<style scoped>

</style>
