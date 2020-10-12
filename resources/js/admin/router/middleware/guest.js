import store from '../../store'
export default function guest ({ next })
{
    if(store.state.auth.token)
    {
        if (localStorage.getItem('token'))
        {
            return next({name: 'Dashboard'})
        }
    }
    return next()
}
