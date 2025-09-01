<template>
  <div class="space-y-4">
    <div
      v-for="(msg, index) in conversation"
      :key="index"
      class="p-4 rounded-lg border"
      :class="msgClass(msg.role)"
    >
      <!-- Header -->
      <div class="flex justify-between items-center mb-1">
        <p class="font-medium text-sm">
          {{ msg.sender }}
        </p>
        <span class="text-xs text-gray-400">
          {{ msg.time }}
        </span>
      </div>

      <!-- Message -->
      <p class="text-sm text-gray-700">
        {{ msg.text }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  conversation: {
    type: Array,
    required: true
  }
})

/**
 * Tambahkan role (misalnya 'lecturer', 'admin', 'support')
 * untuk bedakan warna bubble
 */
const msgClass = (role) => {
  switch (role) {
    case 'lecturer':
      return 'bg-red-50 border-red-200'
    case 'admin':
      return 'bg-blue-50 border-blue-200'
    case 'support':
      return 'bg-green-50 border-green-200'
    default:
      return 'bg-gray-50 border-gray-200'
  }
}
</script>
