import axios from "axios";

function initialState () {
    const employees = [];
    const employee = {
        company: {}
    }
    const pagination = {
        currentPage: 1,
        total: 1,
        perPage: 1,
        lastPage: 1,
    };
    const loader = false;
    const addEmployeeErrors = {
        company_id: [],
        first_name: [],
        last_name: [],
        email: [],
        phone: []
    };
    const updateEmployeeErrors = {
        company_id: [],
        first_name: [],
        last_name: [],
        email: [],
        phone: []
    }
    return {
        employees,
        employee,
        pagination,
        loader,
        addEmployeeErrors,
        updateEmployeeErrors
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


    updateEmployeeErrorsCompanyId(state)
    {
        return state.updateEmployeeErrors.company_id
    },
    updateEmployeeErrorsFirstName(state)
    {
        return state.updateEmployeeErrors.first_name
    },
    updateEmployeeErrorsLastName(state)
    {
        return state.updateEmployeeErrors.last_name
    },
    updateEmployeeErrorsEmail(state)
    {
        return state.updateEmployeeErrors.email
    },
    updateEmployeeErrorsPhone(state)
    {
        return state.updateEmployeeErrors.phone
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
                    ctx.commit('setPagination', resp.data.pagination)
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
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/api/admin/employees/' + id,
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

    async deleteEmployee(ctx, id)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/api/admin/employees/' + id,
                method: 'DELETE'
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
    },
    setUpdateEmployeeErrors(state, updateEmployeeErrors)
    {
        state.updateEmployeeErrors = updateEmployeeErrors
    }
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
