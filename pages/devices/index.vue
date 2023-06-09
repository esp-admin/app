<template>
    <div>
        <n-h2>Devices</n-h2>

        <div class="grid md:grid-cols-3 gap-6">
            <div class="col-span-full flex gap-4">
                <n-input>
                    <template #prefix>
                        <naive-icon name="ph:magnifying-glass" :size="16"></naive-icon>
                    </template>
                </n-input>

                <n-button type="primary">
                    Create device
                </n-button>
            </div>

            <DeviceCard></DeviceCard>
            <DeviceCard></DeviceCard>
            <DeviceCard></DeviceCard>
            <DeviceCard></DeviceCard>
            <DeviceCard></DeviceCard>
            <DeviceCard></DeviceCard>
        </div>
    </div>
</template>