<template>
  <div>
    <n-upload
      class="overflow-hidden w-min mx-auto my-4"
      list-type="image-card"
      :max="1"
      accept="image/*"
      :custom-request="(e) => file = e.file.file"
    >
      <img v-if="model.picture" :src="model.picture" class="object-cover">
    </n-upload>

    <n-form ref="formRef" @submit.prevent="onSubmit(updateAccount)">
      <n-form-item label="Name">
        <n-input v-model:value="model.name" />
      </n-form-item>

      <FormButtons :loading="pending" :disabled="pending" @reset="reset" />
    </n-form>
  </div>
</template>

<script setup lang="ts">
const { user } = useAuthSession()
const { upload } = useS3Object()
const { fetchUser } = useAuth()

const model = ref({
  name: user.value?.name,
  picture: user.value?.picture
})

const { formRef, pending, onSubmit, reset } = useNaiveForm(model)

const file = ref<File | null>()

const loading = ref(false)

async function updateAccount () {
  try {
    loading.value = true

    if (file.value) {
      const url = await upload(file.value, {
        url: model.value.picture,
        prefix: `image/${user.value!.id}/`
      })

      model.value.picture = url
    }

    await useAuthFetch('/api/account/profile', {
      method: 'PATCH',
      body: model.value
    })

    file.value = null

    await fetchUser()
  } finally {
    loading.value = false
  }
}
</script>
