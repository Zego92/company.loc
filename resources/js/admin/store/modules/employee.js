import axios from "axios";

function initialState () {
    const employees = [];
    const employee = {
        company: {}
    }
    const pagination = [];
    const loader = false;
    const addEmployeeErrors = {
        company_id: [],
        first_name: [],
        last_name: [],
        email: [],
        phone: []
    };
    return {
        employees,
        employee,
        pagination,
        loader,
        addEmployeeErrors
    }
}

const getters = {
    employees(state)
    {
        return state.employees
    },
    employee(state)
    {
        return state.employee
    },
    pagination(state)
    {
        return state.pagination
    },
    loader(state)
    {
        return state.loader
    },
    addEmployeeErrorsCompanyId(state)
    {
        return state.addEmployeeErrors.company_id
    },
    addEmployeeErrorsFirstName(state)
    {
        return state.addEmployeeErrors.first_name
    },
    addEmployeeErrorsLastName(state)
    {
        return state.addEmployeeErrors.last_name
    },
    addEmployeeErrorsEmail(state)
    {
        return state.addEmployeeErrors.email
    },
    addEmployeeErrorsPhone(state)
    {
        return state.addEmployeeErrors.phone
    },

};

const actions = {
    async getAllEmployees(ctx, {page = 1, searchField = ''})
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/api/admin/employees?page=' + page + '&search=' + searchField,
                method: 'Get',
            })
                .then((resp) => {
                    ctx.commit('setIsLoad', false)
                    ctx.commit('setEmployees', resp.data.employees)
                    resolve(resp)
                })
                .catch((error) => {
                    ctx.commit('setIsLoad', false)
                    reject(error)
                })
        })
    },

    async getOneEmployee(ctx, id)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/api/admin/employees/' + id,
                method: 'GET'
            })
                .then((resp) => {
                    ctx.commit('setIsLoad', false)
                    ctx.commit('setEmployee', resp.data.employee)
                    resolve(resp)
                })
                .catch((error) => {
                    ctx.commit('setIsLoad', false)
                    reject(error)
                })
        })
    },

    async addNewEmployee(ctx, data)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/api/admin/employees',
                method: 'POST',
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

    async updateEmployee(ctx, {data, id})
    {
        return new Promise((resolve, reject) => {
            axios({
                url: '/api/admin/employees/' + id,
                method: 'PUT',
                data: data
            })
                .then((resp) => {
                    resolve(resp)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },

    async deleteEmployee(ctx, id)
    {
        return new Promise((resolve, reject) => {
            axios({
                url: '/api/admin/employees/' + id,
                method: 'DELETE'
            })
                .then((resp) => {
                    resolve(resp)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

};

const mutations = {
    setEmployees(state, employees)
    {
        state.employees = employees
    },
    setEmployee(state, employee)
    {
        state.employee = employee
    },
    setPagination(state, pagination)
    {
        state.pagination = pagination
    },
    setIsLoad(state, loader)
    {
        state.loader = loader
    },
    setAddEmployeeErrors(state, addEmployeeErrors)
    {
        state.addEmployeeErrors = addEmployeeErrors
    }
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
