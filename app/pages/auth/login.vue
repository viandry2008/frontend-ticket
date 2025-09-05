<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
    <div class="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
      <!-- Header -->
      <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">
        <span class="text-purple-600">🔐 Login</span>
        <span class="text-gray-600"> (Ticket System)</span>
      </h2>

      <form @submit.prevent="login" class="space-y-6">
        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">Email</label>
          <input
            type="email"
            v-model="form.email"
            placeholder="you@example.com"
            class="w-full rounded-lg border border-gray-200 px-4 py-2 shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">Password</label>
          <input
            type="password"
            v-model="form.password"
            placeholder="********"
            class="w-full rounded-lg border border-gray-200 px-4 py-2 shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>

        <!-- Actions -->
        <!-- <div class="flex justify-between items-center text-sm">
          <label class="flex items-center gap-2 text-gray-600">
            <input type="checkbox" v-model="form.remember" class="rounded border-gray-300" />
            Remember me
          </label>
          <NuxtLink to="/forgot-password" class="text-purple-600 hover:underline">
            Forgot password?
          </NuxtLink>
        </div> -->

        <!-- Error -->
        <p v-if="errorMessage" class="text-red-500 text-sm text-center">{{ errorMessage }}</p>

        <!-- Submit -->
        <div class="flex justify-center">
          <button
            type="submit"
            :disabled="loading"
            class="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition duration-200 w-full disabled:opacity-50"
          >
            <span v-if="loading">⏳ Logging in...</span>
            <span v-else>🚀 Login</span>
          </button>
        </div>
      </form>

      <!-- Register link -->
      <!-- <p class="mt-6 text-center text-sm text-gray-600">
        Don’t have an account?
        <NuxtLink to="/register" class="text-purple-600 hover:underline">
          Register here
        </NuxtLink>
      </p> -->
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  email: '',
  password: '',
  remember: false,
})

const loading = ref(false)
const errorMessage = ref('')

async function login() {
  loading.value = true
  errorMessage.value = ''
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json' // penting! biar Laravel balikin JSON
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    })

    const data = await res.json() // hanya sekali!
    console.log('API Response:', data)

    if (!res.ok) {
      throw new Error(data.message || 'Login failed')
    }

    // simpan token & user ke localStorage
    localStorage.setItem('auth_token', data.token)
    localStorage.setItem('auth_user', JSON.stringify(data.user))
    localStorage.setItem('user_id', data.user.id)
    localStorage.setItem('role', data.user.role)

    // redirect sesuai role
    if (data.user.role === 'admin_university') {
      router.push('/tickets') 
    } else {
      router.push('/tickets') 
    }
  } catch (err) {
    errorMessage.value = err.message
  } finally {
    loading.value = false
  }
}

</script>
