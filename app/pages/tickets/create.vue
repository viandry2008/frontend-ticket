<template>
  <div class="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8">
    <!-- Header -->
    <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">
      <span class="text-purple-600">+ Create Ticket</span>
      <span class="text-gray-600"> (Uni Admin)</span>
    </h2>

    <form @submit.prevent="submitTicket" class="space-y-6">
      <!-- University -->
      <div>
        <label class="block text-sm font-medium text-gray-600 mb-1">University</label>
        <input 
          type="text" 
          v-model="form.university" 
          class="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500" 
          disabled 
        />
      </div>

      <!-- Title -->
      <div>
        <label class="block text-sm font-medium text-gray-600 mb-1">Title</label>
        <input 
          type="text" 
          v-model="form.title" 
          placeholder="Brief summary" 
          class="w-full rounded-lg border border-gray-200 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500" 
        />
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-medium text-gray-600 mb-1">Description</label>
        <textarea 
          v-model="form.description" 
          placeholder="Describe the issue" 
          rows="4"
          class="w-full rounded-lg border border-gray-200 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        ></textarea>
      </div>

      <!-- Submit -->
      <div class="flex justify-center">
        <button 
          type="submit" 
          class="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition duration-200"
          :disabled="loading"
        >
          <span v-if="loading">⏳ Submitting...</span>
          <span v-else>🚀 Submit Ticket</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)

// user dan token dari localStorage
let token = null
let user = null

onMounted(() => {
  token = localStorage.getItem('auth_token')
  user = JSON.parse(localStorage.getItem('auth_user') || '{}')

  if (!user || !token) {
    router.push('/auth/login')
    return
  }

  if (user.role === 'admin_university' && user.university) {
    form.university = user.university.name
    form.university_id = user.university.id
  } else {
    alert("Hanya admin universitas yang bisa membuat tiket.")
    router.push('/tickets')
  }
})

const form = reactive({
  university: "",       // tampilan
  university_id: null,  // untuk API
  title: "",
  description: ""
})

async function submitTicket() {
  if (!form.title || !form.description) {
    alert("Title dan Description wajib diisi.")
    return
  }

  try {
    loading.value = true
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/tickets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        university_id: form.university_id,
        title: form.title,
        description: form.description,
        status: "open",
        created_by: user?.id
      })
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || "Gagal membuat ticket")
    }

    console.log("Ticket berhasil dibuat:", data)
    router.push(`/tickets/${data.id}`)

  } catch (err) {
    console.error("Error submit ticket:", err)
    alert("Terjadi kesalahan saat membuat ticket.")
  } finally {
    loading.value = false
  }
}
</script>


