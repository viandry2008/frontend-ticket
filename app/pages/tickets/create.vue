<template>
  <div class="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6">
    <h2 class="text-xl font-semibold mb-4">+ Create Ticket (Uni Admin)</h2>

    <form @submit.prevent="submitTicket" class="space-y-4">
      <!-- University -->
      <div>
        <label class="block text-sm font-medium text-gray-700">University</label>
        <input type="text" v-model="form.university" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" disabled />
      </div>

      <!-- Title -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Title</label>
        <input type="text" v-model="form.title" placeholder="Brief summary" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Description</label>
        <textarea v-model="form.description" placeholder="Describe the issue" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
      </div>

      <!-- Submit -->
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Submit
      </button>
    </form>
  </div>
</template>

<script setup>
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
