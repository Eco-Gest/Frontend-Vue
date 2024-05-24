import { useAuthStore } from '~~/store/auth'

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()
    
    // If user is authenticated and trying to access login or register page, redirect to home
    if ((to.fullPath === '/login' || to.fullPath === '/register') && authStore.isLoggedIn) {
        return navigateTo('/')
    }

    // If user is not authenticated and trying to access any other page, redirect to login
    if (!authStore.isLoggedIn && (to.fullPath !== '/login' && to.fullPath !== '/forgotten-password')) {
        return navigateTo('/login')
    }
})