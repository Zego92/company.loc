<template>
    <div>
        <v-snackbar absolute top right :color="snackbarData.color" timeout="2000" :top="true" rounded="pill" v-model="snackbarData.snackbar">
            {{ snackbarData.text }}
            <template v-slot:action="{ attrs }">
                <v-btn color="white" text v-bind="attrs" @click="snackbarData.snackbar = false"><v-icon>mdi-close</v-icon></v-btn>
            </template>
        </v-snackbar>
        <v-form class="px-4">
            <v-text-field v-model="companyData.name" type="text" label="Name" clearable counter class="mb-3"/>
            <v-text-field v-model="companyData.email" type="email" label="Email" clearable counter class="mb-3"/>
            <v-text-field v-model="companyData.imageName" @click='pickFile' accept="image/*" type="tel" label="Logo" clearable counter class="mb-3"/>
            <v-text-field v-model="companyData.website" type="text" label="Website" clearable counter class="mb-3"/>
            <input title="" type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked">
            <v-btn
                block
                text
                color="primary"
                @click="onClickUpdateCompany"
                :loading="updateCompanyLoader"
                :disabled="updateCompanyLoader">
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
                updateCompanyLoader: false
            }
        },
        components: {},
        computed: {
            ...mapGetters('company', [
                'company'
            ])
        },
        watch: {},
        methods: {
            ...mapActions('company', [
                'updateCompany'
            ]),
            onClickUpdateCompany()
            {
                this.updateCompanyLoader = true;
                this.updateCompany({
                    id: this.$props.id,
                    data: this.companyData
                })
                .then((response) => {

                })
                .catch((error) => {

                })
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
        }
    }
</script>

<style scoped>

</style>
