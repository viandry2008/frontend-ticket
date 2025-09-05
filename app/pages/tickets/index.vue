<template>
  <div class="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
        🎟️ Tickets
        <span class="text-sm font-medium text-gray-500">
          ({{ userRoleLabel }})
        </span>
      </h2>

      <div class="flex items-center gap-3">
        <!-- Search -->
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search tickets..."
            class="w-64 rounded-xl border border-gray-200 pl-10 pr-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
          <svg
            class="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
          </svg>
        </div>

        <!-- Create Ticket -->
        <NuxtLink
          to="/tickets/create"
          class="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold px-4 py-2 rounded-xl shadow hover:shadow-lg transition duration-200"
        >
          + Create Ticket
        </NuxtLink>

        <!-- Logout -->
        <button
          @click="logout"
          class="bg-gray-200 text-gray-800 px-4 py-2 rounded-xl shadow hover:bg-gray-300 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <thead class="bg-gradient-to-r from-purple-50 to-pink-50 text-sm text-gray-600">
          <tr>
            <th class="px-4 py-3 text-left font-medium">ID</th>
            <th class="px-4 py-3 text-left font-medium">Title</th>
            <th class="px-4 py-3 text-left font-medium">University</th>
            <th class="px-4 py-3 text-left font-medium">Status</th>
            <th class="px-4 py-3 text-left font-medium">Assignee</th>
            <th class="px-4 py-3 text-left font-medium">Updated</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="ticket in filteredTickets"
            :key="ticket.id"
            class="border-t hover:bg-gray-50 transition duration-150"
          >
            <td class="px-4 py-3 font-semibold text-gray-700">{{ ticket.id }}</td>
            <td class="px-4 py-3">
              <NuxtLink
                :to="`/tickets/${ticket.id}`"
                class="text-purple-600 hover:underline font-medium"
              >
                {{ ticket.title }}
              </NuxtLink>
            </td>
            <td class="px-4 py-3 text-gray-700">{{ ticket.university?.name || '—' }}</td>
            <td class="px-4 py-3">
              <span
                class="px-3 py-1 text-xs font-medium rounded-full shadow-sm"
                :class="$getStatusClass(ticket.status)"
              >
                {{ $formatStatus(ticket.status) }}
              </span>
            </td>
            <td class="px-4 py-3 text-gray-600">{{ ticket.assigned?.name || '—' }}</td>
            <td class="px-4 py-3 text-sm text-gray-500">{{ $formatDate(ticket.updated_at)  }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRuntimeConfig } from '#app'
const { $formatDate, $getStatusClass, $formatStatus } = useNuxtApp()

const router = useRouter()
const config = useRuntimeConfig()

const searchQuery = ref("")
const tickets = ref([])
const token = ref(null)
const user = ref(null)
const userRoleLabel = ref("")

const baseUrl = import.meta.env.VITE_BASE_URL

// hanya ambil localStorage di client
onMounted(() => {
  if (process.client) {
    token.value = localStorage.getItem('auth_token')
    user.value = JSON.parse(localStorage.getItem('auth_user') || "null")

    if (!token.value) {
      router.push('/auth/login')
    } else {
      fetchTickets()
      setUserRoleLabel()
    }
  }
})

function setUserRoleLabel() {
  if (!user.value) return
  if (user.value.role === "admin_university") {
    userRoleLabel.value = `Admin University - ${user.value.university?.name || "—"}`
  } else {
    // userRoleLabel.value = user.value.role
    userRoleLabel.value = 'Support Staff'
  }
}

// Fetch tickets
async function fetchTickets() {
  try {
    const res = await fetch(`${baseUrl}/api/tickets`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
        Accept: 'application/json',
      },
    })

    if (res.status === 401) {
      doLogout()
      return
    }

    if (!res.ok) throw new Error('Failed to fetch tickets')

    const data = await res.json()
    tickets.value = data.data || data
  } catch (err) {
    console.error(err)
  }
}

// Logout
async function logout() {
  try {
    await fetch(`${baseUrl}/api/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.value}`,
        Accept: 'application/json',
      },
    })
  } catch (err) {
    console.error("Logout error:", err)
  } finally {
    doLogout()
  }
}

// Bersihkan storage + redirect
function doLogout() {
  if (process.client) {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  }
  router.push('/auth/login')
}

const filteredTickets = computed(() => {
  if (!searchQuery.value) return tickets.value
  return tickets.value.filter(ticket =>
    ticket.title?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    ticket.university?.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    ticket.id?.toString().toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>
