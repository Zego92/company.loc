import axios from "axios";

function initialState () {
    const token = localStorage.getItem('token') || ""
    const companiesCount = {};
    const employeesCount = {};
    return {
        token,
        companiesCount,
        employeesCount
    }
}

const getters = {
    token(state)
    {
        return state.token
    },
    companiesCount(state)
    {
        return state.companiesCount
    },
    employeesCount(state)
    {
        return state.employeesCount
    },
};

const actions = {
    async getCount(ctx, headers = {})
    {
        return new Promise((resolve, reject) => {
            axios({
                url: '/api/admin/dashboard',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...headers
                },
            })
                .then((resp) => {
                    ctx.commit('setToken', resp.data.token)
                    resolve(resp)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },

};

const mutations = {
    setToken(state, token)
    {
        state.token = token;
        localStorage.setItem('token', state.token)
    },
    setCompaniesCount(state, companiesCount)
    {
        state.companiesCount = companiesCount
    },
    setEmployeesCount(state, employeesCount)
    {
        state.employeesCount = employeesCount
    },
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
