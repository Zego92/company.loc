import axios from "axios";

function initialState () {
    const companiesCount = {};
    const employeesCount = {};
    const loader = false;
    return {
        companiesCount,
        employeesCount,
        loader
    }
}

const getters = {
    companiesCount(state)
    {
        return state.companiesCount
    },
    employeesCount(state)
    {
        return state.employeesCount
    },
    loader(state)
    {
        return state.loader
    }
};

const actions = {
    async getCount(ctx)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/api/admin/dashboard',
                method: 'GET',
            })
                .then((resp) => {
                    ctx.commit('setIsLoad', false)
                    ctx.commit('setCompaniesCount', resp.data.companiesCount)
                    ctx.commit('setEmployeesCount', resp.data.employeesCount)
                    resolve(resp)
                })
                .catch((error) => {
                    ctx.commit('setIsLoad', false)
                    reject(error)
                })
        })
    },

};

const mutations = {
    setCompaniesCount(state, companiesCount)
    {
        state.companiesCount = companiesCount
    },
    setEmployeesCount(state, employeesCount)
    {
        state.employeesCount = employeesCount
    },
    setIsLoad(state, loader)
    {
        state.loader = loader
    }
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
