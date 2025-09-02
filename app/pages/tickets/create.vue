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
        >
          🚀 Submit Ticket
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  university: "Universitas Jakarta Timur (UNIJAT)",
  title: "",
  description: ""
})

function submitTicket() {
  console.log("Ticket submitted:", form)
  // TODO: Integrasi API
}
</script>
