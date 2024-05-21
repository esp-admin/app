<template>
  <n-form
    ref="formRef"
    :rules="rules"
    :model="model"
    @submit.prevent="onSubmit(handleSubmit)"
  >
    <n-form-item
      label="Version"
      path="version"
    >
      <n-input v-model:value="model.version" />
    </n-form-item>

    <n-form-item
      path="file"
      label="Firmware"
    >
      <n-upload
        :custom-request="onUpload"
        accept=".bin"
        :max="1"
      >
        <n-upload-dragger>
          <div>
            <naive-icon
              :name="ICON_UPLOAD"
              :size="28"
            />
          </div>

          <n-text
            class="text-sm"
            :depth="2"
          >
            Click or drag a firmware.bin to this area to upload
          </n-text>
        </n-upload-dragger>
      </n-upload>
    </n-form-item>

    <div class="flex gap-4">
      <n-button
        secondary
        class="flex-1"
        attr-type="button"
        :disabled="pending"
        @click="$emit('cancel')"
      >
        Cancel
      </n-button>
      <n-button
        type="primary"
        class="flex-1"
        attr-type="submit"
        :loading="pending"
        :disabled="pending"
      >
        Create release
      </n-button>
    </div>
  </n-form>
</template>

<script setup lang="ts">
import type { UploadCustomRequestOptions } from 'naive-ui'

const props = defineProps<{ project: Project }>()

const emits = defineEmits(['cancel', 'done'])

const model = ref({
  version: '',
  file: null as File | null,
})

const { apiErrors, formRef, onSubmit, pending, rules } = useNaiveForm(model)

apiErrors.value = {
  versionAlreadyExists: false,
  invalidSize: false,
  uploadFailed: false,
}

rules.value = {
  version: [
    {
      required: true,
      message: ERROR_REQUIRED,
      trigger: 'input',
    },
    {
      message: ERROR_EXISTS,
      validator: () => !apiErrors.value.versionAlreadyExists,
    },
    {
      validator: (_, value) => REGEX_VERSION.test(value),
      message: ERROR_INVALID_VERSION,
      trigger: 'input',
    },
  ],
  file: [
    {
      required: true,
      message: ERROR_REQUIRED,
    },
    {
      message: ERROR_UPLOAD_SIZE,
      validator: () => !apiErrors.value.invalidSize,
    },
    {
      message: ERROR_UPLOAD_FAILED,
      validator: () => !apiErrors.value.uploadFailed,
    },
  ],
}

function onUpload(event: UploadCustomRequestOptions) {
  model.value.file = event.file.file
}

async function handleSubmit() {
  const { add } = useRelease(props.project.id)

  await add(model.value.version, model.value.file!)
    .then(async (release) => {
      const { findLinked } = useDevice()

      const linkedDevices = await findLinked(props.project.id)

      const { $mqtt } = useNuxtApp()

      for (const device of linkedDevices.value) {
        $mqtt.publish({
          deviceId: device.id,
          action: 'command',
          type: 'update',
          retain: true,
          payload: JSON.stringify({
            releaseId: release.id,
            version: release.version,
            downloadPath: release.downloadPath,
          }),
        })
      }

      emits('done')
    })
    .catch((err) => {
      apiErrors.value.versionAlreadyExists = err.data.message.includes('Unique constraint failed')
      apiErrors.value.invalidSize = err.data.message === 'invalid-size'
      apiErrors.value.uploadFailed = err.data.message === 'upload-failed'
    })
}
</script>
