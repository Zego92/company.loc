import store from '../../store'
export default function auth ({next}){
    if(!store.state.auth.token)
    {
        if(!localStorage.getItem('token'))
        {
            return next({name: 'Login'})
        }
    }
    return next()
}
