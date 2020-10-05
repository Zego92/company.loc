import axios from "axios";

function initialState () {
    const isAuth = false;
    const token = localStorage.getItem('token') || ""
    const loginErrors = {
        email: [],
        password: []
    }

    return {
        isAuth,
        loginErrors,
        token
    }
}

const getters = {
    loginErrorsEmail(state)
    {
        return state.loginErrors.email
    },
    loginErrorsPassword(state)
    {
        return state.loginErrors.password
    },
    token(state)
    {
        return state.token
    }
};

const actions = {
    async login(ctx, data)
    {
        return new Promise((resolve, reject) => {
            axios({
                url: '/api/admin/login',
                method: 'POST',
                data: data,
            })
                .then((resp) => {
                    ctx.commit('setIsAuth', true)
                    ctx.commit('setToken', resp.data.token)
                    resolve(resp)
                })
                .catch((error) => {
                    ctx.commit('logLoginErrors', error.response.data.errors)
                    reject(error)
                })
        })
    },

    async logout(ctx){
        ctx.commit('setIsAuth', false)
        ctx.commit('setToken', null)
    },


};

const mutations = {
    setIsAuth(state, isAuth)
    {
        state.isAuth = isAuth
    },
    logLoginErrors(state, loginErrors)
    {
        state.loginErrors = loginErrors;
    },
    setToken(state, token)
    {
        state.token = token;
        localStorage.setItem('token', state.token)
    }
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
