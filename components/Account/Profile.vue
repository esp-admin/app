<template>
  <div>
    <upload-image
      ref="uploadRef"
      class="mb-2 mx-auto shadow hover:shadow-lg border-blue-300 border-2"
      :src="model.picture"
      :width="160"
      @select="(f) => model.file=f"
    />

    <n-form
      ref="formRef"
      :rules="rules"
      :model="model"
      @submit.prevent="onSubmit(updateAccount)"
    >
      <n-form-item
        label="Name"
        path="name"
      >
        <n-input v-model:value="model.name" />
      </n-form-item>

      <form-buttons
        :loading="pending"
        :disabled="pending || !edited"
        @reset="handleReset"
      />
    </n-form>
  </div>
</template>

<script setup lang="ts">
const { user } = useAuthSession()

const uploadRef = ref()

const model = ref({
  name: user.value?.name,
  picture: user.value?.picture,
  file: null,
})

const { edited, formRef, pending, onSubmit, reset, rules } = useNaiveForm(model)

rules.value = {
  name: [
    {
      required: true,
      message: ERROR_REQUIRED,
    },
  ],
}

function handleReset() {
  uploadRef.value.reset()
  reset()
}

async function updateAccount() {
  const formData = new FormData()

  formData.append('data', JSON.stringify({
    name: model.value.name,
    picture: model.value.picture,
  }))

  model.value.file && formData.append('file', model.value.file)

  const { $auth } = useNuxtApp()

  await $auth.fetch('/api/account/profile', {
    method: 'PATCH',
    body: formData,
  })

  await useAuth().fetchUser()

  model.value.picture = user.value?.picture
  model.value.file = null
}
</script>
