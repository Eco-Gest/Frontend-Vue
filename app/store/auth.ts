import { defineStore } from 'pinia';

interface UserPayloadInterface {
  email: string;
  username: string;
  password: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
  }),
  actions: {
    async authenticateUser({ email, password }: UserPayloadInterface) {
      // useFetch from nuxt 3
      const { data, pending }: any = await useFetch('http://localhost:8080/api/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          email,
          password,
        },
      });
      this.loading = pending;

      if (data.value) {
        const token = useCookie('token'); // useCookie new hook in nuxt 3
        console.log(data.value);
        token.value = data?.value?.access_token; // set token to cookie
        this.authenticated = true; // set authenticated  state value to true
      }
    },
    async registerUser({ email, username, password }: UserPayloadInterface) {
      try {
        const { data, pending }: any = await useFetch('http://localhost:8080/api/register', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: {
            email,
            username,
            password,
          },
        });
        
        // Update loading state
        this.loading = pending;
        
        const router = useRouter();

        if (data.value) {
          // Registration successful
          // Redirect the user back to the signup view
          router.push('/login');
        } else {
          // Handle registration errors
          console.error('Registration failed:', data.error); // Log the error
          // Display error message to the user or handle it in another way
        }
      } catch (error) {
        // Handle any unexpected errors
        console.error('Error during registration:', error);
        // Display error message to the user or handle it in another way
      }
    },
    
    logUserOut() {
      const token = useCookie('token'); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
    },
  },
});