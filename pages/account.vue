<template>
    <div>
        <div class="flex gap-2 items-center mb-4">
            <naive-icon name="ph:user"></naive-icon>
            <n-text class="col-span-full text-lg font-medium">
                Account
            </n-text>
        </div>

        <n-tabs type="line" animated>
            <n-tab-pane name="profile" tab="Profile">
                <AccountProfile />
            </n-tab-pane>

            <n-tab-pane v-if="user?.provider === 'default'" name="security" tab="Security">
                <AccountPassword />
            </n-tab-pane>

            <n-tab-pane name="preferences" tab="Preferences">
                <AccountPreferences />
            </n-tab-pane>

            <n-tab-pane name="Sessions" tab="Sessions">
                <AccountSessions />
            </n-tab-pane>
        </n-tabs>
    </div>
</template>

<script setup>
const { useUser } = useAuthSession()
const user = useUser()
</script>