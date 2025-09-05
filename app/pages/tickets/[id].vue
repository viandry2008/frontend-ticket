<template>
  <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
    <!-- Tombol Back -->
    <button
      @click="router.push('/tickets')"
      class="mb-6 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium shadow-sm transition"
    >
      ⬅ Back
    </button>

    <!-- Ticket Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">{{ ticket.title }}</h2>
        <p v-if="ticket.description" class="text-base text-gray-600 mt-1">
          {{ ticket.description }}
        </p>
        <p class="text-sm text-gray-500">
          {{ ticket.created_by?.name }} ·  {{ ticket.created_by?.university.name }} · Created {{ $formatDate(ticket.created_at) }}
        </p>
        <p class="text-xs text-gray-400">
          Updated {{ $formatDate(ticket.updated_at) }} · Assigned to
          <span class="font-medium text-gray-700">{{ ticket.assigned?.name || '—' }}</span>
        </p>
      </div>
      <div class="flex gap-2">
        <span
          class="px-3 py-1 text-xs font-medium rounded-full shadow-sm"
          :class="$getStatusClass(ticket.status)"
        >
          {{ $formatStatus(ticket.status) }}
        </span>
      </div>
    </div>

    <!-- Conversation -->
    <div class="space-y-4">
      <div
        v-for="msg in conversations"
        :key="msg.id"
        class="flex"
        :class="msg.sender_id === currentUserId ? 'justify-end' : 'justify-start'"
      >
        <div
          class="max-w-md px-4 py-3 rounded-2xl shadow-sm"
          :class="msg.sender_id === currentUserId
            ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white text-right'
            : 'bg-gray-100 text-gray-800 text-left'"
        >
          <!-- tampilkan nama hanya jika bukan user login -->
          <p v-if="msg.sender_id !== currentUserId" class="text-sm font-semibold">
            {{ msg.sender?.name || 'Unknown' }}
            <span class="text-xs ml-2 opacity-70">{{ $formatDate(msg.created_at) }}</span>
          </p>
          <p v-else class="text-xs opacity-80 mb-1">{{ $formatDate(msg.created_at) }}</p>

          <p class="text-sm mt-1 whitespace-pre-line">{{ msg.message }}</p>
        </div>
      </div>
    </div>

    <!-- Actions (hanya untuk support staff / admin) -->
    <div v-if="['support_staff','admin'].includes(currentUserRole)" class="mt-8 flex flex-wrap gap-3 relative">
      <!-- Assign Dropdown -->
      <div class="relative">
        <button
          @click="showAssignMenu = !showAssignMenu"
          class="px-4 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-indigo-500 to-indigo-600 shadow hover:shadow-lg transition"
        >
          📌 Assign ▾
        </button>
        <div
          v-if="showAssignMenu"
          class="absolute mt-2 w-48 bg-white border rounded-xl shadow-lg z-10"
        >
          <ul class="text-sm text-gray-700">
            <li 
              v-for="user in assignableUsers"
              :key="user.id"
              @click="assignTo(user)"
              class="px-4 py-2 hover:bg-gray-100 cursor-pointer"  
            >
              {{ user.name }} ({{ $formatStatus(user.role) }})
            </li>
          </ul>
        </div>
      </div>

      <!-- Status Buttons -->
      <button
        @click="updateStatus('in_progress')"
        class="px-4 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 shadow hover:shadow-lg transition"
      >
        🔄 In Progress
      </button>

      <button
        @click="updateStatus('closed')"
        class="px-4 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-gray-600 to-gray-700 shadow hover:shadow-lg transition"
      >
        ✖ Close
      </button>

      <button
        @click="updateStatus('resolved')"
        class="px-4 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow hover:shadow-lg transition"
      >
        ✅ Mark Resolved
      </button>
    </div>

    <!-- Reply Box -->
    <div class="mt-6 flex items-center gap-3">
      <input
        v-model="replyMessage"
        type="text"
        placeholder="Write a reply..."
        class="flex-1 px-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 shadow-sm"
      />
      <button
        @click="sendReply"
        class="px-5 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-indigo-500 to-indigo-600 shadow hover:shadow-lg transition"
      >
        ➤ Send
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Realtime } from 'ably'
const { $formatDate } = useNuxtApp()

const router = useRouter()
const route = useRoute()
const ticket = ref({})
const conversations = ref([])
const replyMessage = ref("")
const showAssignMenu = ref(false)

const currentUserId = ref(null)
const currentUserRole = ref('user')
const token = ref(null)

const assignableUsers = ref([])

const baseUrl = import.meta.env.VITE_BASE_URL

// ==== FETCH API ====
async function fetchTicket() {
  const res = await fetch(`${baseUrl}/api/tickets/${route.params.id}`, {
    headers: { Authorization: `Bearer ${token.value}` }
  })
  ticket.value = await res.json()
}

async function fetchAssignableUsers() {
  const res = await fetch(`${baseUrl}/api/tickets/users/assign`, {
    headers: { Authorization: `Bearer ${token.value}` }
  })
  const data = await res.json()
  assignableUsers.value = data.data
}

async function fetchConversations() {
  const res = await fetch(`${baseUrl}/api/tickets/${route.params.id}/conversations`, {
    headers: { Authorization: `Bearer ${token.value}` }
  })
  conversations.value = await res.json()
}

async function assignTo(user) {
  await fetch(`${baseUrl}/api/tickets/${route.params.id}/assign`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`
    },
    body: JSON.stringify({ assigned_to: user.id })
  })
  ticket.value.assigned = user

  // langsung ubah status assigned
  await updateStatus('assigned')
  showAssignMenu.value = false
}

async function updateStatus(status) {
  await fetch(`${baseUrl}/api/tickets/${route.params.id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`
    },
    body: JSON.stringify({ status })
  })
  ticket.value.status = status

  // broadcast realtime
  channel.publish('status-changed', { status })
}

async function sendReply() {  
  if (!replyMessage.value) return

  const res = await fetch(`${baseUrl}/api/tickets/${route.params.id}/conversations`, {
    method: "POST",
    headers: {  
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`
    },
    body: JSON.stringify({ message: replyMessage.value })
  })

  const newMsg = await res.json()
  channel.publish('new-message', newMsg)
  replyMessage.value = ""
}

// ==== ABLY ====
let ably = null
let channel = null

function initAbly() {
  ably = new Realtime({ key: import.meta.env.VITE_ABLY_KEY })
  channel = ably.channels.get(`ticket-${route.params.id}`)

  channel.subscribe('new-message', (msg) => {
    conversations.value.push(msg.data)
  })

  channel.subscribe('status-changed', (msg) => {
    ticket.value.status = msg.data.status
  })
}

onMounted(() => {
  token.value = localStorage.getItem('auth_token')
  currentUserId.value = Number(localStorage.getItem('user_id'))
  currentUserRole.value = localStorage.getItem('role') || 'user'

  fetchTicket()
  fetchConversations()
  fetchAssignableUsers()
  initAbly()
})

onBeforeUnmount(() => {
  if (channel) channel.detach()
  if (ably) ably.close()
})

</script>
