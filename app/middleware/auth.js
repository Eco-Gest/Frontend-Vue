import { useUserStore } from '~~/store/user'

export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore()
    
    // If user is authenticated and trying to access login or register page, redirect to home
    if ((to.fullPath === '/login' || to.fullPath === '/register') && userStore.isLoggedIn) {
        return navigateTo('/')
    }

    // If user is not authenticated and trying to access any other page, redirect to login
    if (!userStore.isLoggedIn && to.fullPath !== '/login') {
        return navigateTo('/login')
    }
})