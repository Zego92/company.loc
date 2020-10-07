import axios from "axios";

function initialState () {
    const loader = false;
    const companies = [];
    const company = {
        employees: []
    };
    const addCompanyErrors = {
        email: [],
        logo: [],
        name: [],
        website: []
    };
    const pagination = {
        currentPage: 1,
        total: 1,
        perPage: 1,
        lastPage: 1,
    }
    const updateCompanyErrors = {
        email: [],
        logo: [],
        name: [],
        website: []
    }
    return {
        loader,
        companies,
        addCompanyErrors,
        pagination,
        company,
        updateCompanyErrors
    }
}

const getters = {
    loader(state)
    {
        return state.loader
    },
    companies(state)
    {
        return state.companies
    },
    addCompanyErrorsEmail(state)
    {
        return state.addCompanyErrors.email
    },
    addCompanyErrorsLogo(state)
    {
        return state.addCompanyErrors.logo
    },
    addCompanyErrorsName(state)
    {
        return state.addCompanyErrors.name
    },
    addCompanyErrorsWebsite(state)
    {
        return state.addCompanyErrors.website
    },
    pagination(state)
    {
        return state.pagination
    },
    company(state)
    {
        return state.company
    },

    updateCompanyErrorsEmail(state)
    {
        return state.updateCompanyErrors.email
    },
    updateCompanyErrorsLogo(state)
    {
        return state.updateCompanyErrors.logo
    },
    updateCompanyErrorsName(state)
    {
        return state.updateCompanyErrors.name
    },
    updateCompanyErrorsWebsite(state)
    {
        return state.updateCompanyErrors.website
    },
};

const actions = {
    async getAllCompanies(ctx, {page = 1, searchField = ''})
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/api/admin/companies?page=' + page + '&search=' + searchField,
                method: 'GET',
            })
                .then((resp) => {
                    ctx.commit('setIsLoad', false)
                    ctx.commit('setCompanies', resp.data.companies)
                    ctx.commit('setPagination', resp.data.pagination)
                    resolve(resp)
                })
                .catch((error) => {
                    ctx.commit('setIsLoad', false)
                    reject(error)
                })
        })
    },

    async addNewCompany(ctx, data)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/api/admin/companies',
                method: 'POST',
                data: data
            })
                .then((resp) => {
                    ctx.commit('setIsLoad', false)
                    resolve(resp)
                })
                .catch((error) => {
                    console.log(error.response.data.errors)
                    ctx.commit('setIsLoad', false)
                    ctx.commit('setAddCompanyErrors', error.response.data.errors)
                    reject(error)
                })
        })
    },

    async getOneCompany(ctx, id)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/api/admin/companies/' + id,
                method: 'GET'
            })
                .then((resp) => {
                    ctx.commit('setIsLoad', false)
                    ctx.commit('setCompany', resp.data.company)
                    resolve(resp)
                })
                .catch((error) => {
                    ctx.commit('setIsLoad', false)
                    reject(error)
                })
        })
    },

    async updateCompany(ctx, {data, id})
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/api/admin/companies/' + id,
                method: 'PUT',
                data: data
            })
                .then((resp) => {
                    ctx.commit('setIsLoad', false)
                    resolve(resp)
                })
                .catch((error) => {
                    ctx.commit('setIsLoad', false)
                    reject(error)
                })
        })
    },

    async deleteCompany(ctx, id)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/api/admin/companies/' + id,
                method: 'DELETE',
            })
                .then((resp) => {
                    ctx.commit('setIsLoad', false)
                    resolve(resp)
                })
                .catch((error) => {
                    ctx.commit('setIsLoad', false)
                    reject(error)
                })
        })
    }
};

const mutations = {
    setIsLoad(state, loader)
    {
        state.loader = loader
    },
    setCompanies(state, companies)
    {
        state.companies = companies
    },
    setAddCompanyErrors(state, addCompanyErrors)
    {
        state.addCompanyErrors = addCompanyErrors
    },
    setPagination(state, pagination)
    {
        state.pagination = pagination
    },
    setCompany(state, company)
    {
        state.company = company;
    },
    setUpdateCompanyErrors(state, updateCompanyErrors)
    {
        state.updateCompanyErrors = updateCompanyErrors
    }
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
