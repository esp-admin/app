# Changelog

## v1.2.5

[compare changes](https://github.com/esp-admin/app/compare/v1.2.4...v1.2.5)

### 🌊 Types

- Fix typecheck issues ([8b88bb8](https://github.com/esp-admin/app/commit/8b88bb8))

### 🏡 Chore

- Refresh lockfile ([2028277](https://github.com/esp-admin/app/commit/2028277))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v1.2.4

[compare changes](https://github.com/esp-admin/app/compare/v1.2.3...v1.2.4)

### 🔥 Performance

- Generate theme config on build ([a311ab7](https://github.com/esp-admin/app/commit/a311ab7))

### 💅 Refactors

- Increase deployment timeout to 8min ([b5b40f7](https://github.com/esp-admin/app/commit/b5b40f7))
- Show update progress in percentage ([907aebe](https://github.com/esp-admin/app/commit/907aebe))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v1.2.3

[compare changes](https://github.com/esp-admin/app/compare/v1.2.2...v1.2.3)

### 🩹 Fixes

- Update sessions list on delete ([7cb03f9](https://github.com/esp-admin/app/commit/7cb03f9))

### 💅 Refactors

- Change drawer width to 80% ([3570642](https://github.com/esp-admin/app/commit/3570642))

### 🌊 Types

- Solve typecheck issues ([9a70556](https://github.com/esp-admin/app/commit/9a70556))

### 🏡 Chore

- Sync lock ([b911f94](https://github.com/esp-admin/app/commit/b911f94))
- **lint:** Disable `vue/multi-word-component-names` rule ([f1647ef](https://github.com/esp-admin/app/commit/f1647ef))

### 🤖 CI

- Allow manual ci trigger ([1f3067b](https://github.com/esp-admin/app/commit/1f3067b))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v1.2.2

[compare changes](https://github.com/esp-admin/app/compare/v1.2.1...v1.2.2)

### 🩹 Fixes

- Fix NAN date on device card ([4565cc9](https://github.com/esp-admin/app/commit/4565cc9))
- Correctly resolve S3 driver at build ([5f6e3e3](https://github.com/esp-admin/app/commit/5f6e3e3))

### 💅 Refactors

- Change pagination style ([15a6c3f](https://github.com/esp-admin/app/commit/15a6c3f))

### 🌊 Types

- Solve typecheck issues ([4e03521](https://github.com/esp-admin/app/commit/4e03521))

### 🏡 Chore

- Use directory structure of `nuxt` v4 ([d607ad7](https://github.com/esp-admin/app/commit/d607ad7))
- Upgrade `nuxt-naiveui` to v2 ([d1fe03e](https://github.com/esp-admin/app/commit/d1fe03e))
- Sync lock ([741f073](https://github.com/esp-admin/app/commit/741f073))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v1.2.1

[compare changes](https://github.com/esp-admin/app/compare/v1.2.0...v1.2.1)

### 🩹 Fixes

- No longer retain MQTT message triggering update ([0f0f912](https://github.com/esp-admin/app/commit/0f0f912))
- Automatically show deployments on trigger release ([47c1429](https://github.com/esp-admin/app/commit/47c1429))

### 💅 Refactors

- Add 'deploy' button on Deployment card ([44ffab0](https://github.com/esp-admin/app/commit/44ffab0))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v1.2.0

[compare changes](https://github.com/esp-admin/app/compare/v1.1.1...v1.2.0)

### 🚀 Enhancements

- **useReport:** Add `handleUpdateProgress` to handle update progress ([8002d9a](https://github.com/esp-admin/app/commit/8002d9a))
- Add update `progress` on Deployment state ([4da99a9](https://github.com/esp-admin/app/commit/4da99a9))
- Show deployment progress on release page ([#12](https://github.com/esp-admin/app/pull/12))
- Add option to abort active deployment ([#13](https://github.com/esp-admin/app/pull/13))

### 🔥 Performance

- Change ID format to `cuid` on SQL database ([e156459](https://github.com/esp-admin/app/commit/e156459))

### 🩹 Fixes

- Add missing `updatedAt` on Device and Project cards ([9bfbcf1](https://github.com/esp-admin/app/commit/9bfbcf1))

### 💅 Refactors

- **mqtt:** Change topic `device/+/report/update` to `device/+/report/update_status` ([21ebf39](https://github.com/esp-admin/app/commit/21ebf39))
- **useReport:** No change ([b3df761](https://github.com/esp-admin/app/commit/b3df761))
- Add `downloadSize` on update command ([3a7583e](https://github.com/esp-admin/app/commit/3a7583e))
- Add `downloadSize` field on Release model ([3f3d2e4](https://github.com/esp-admin/app/commit/3f3d2e4))
- No change ([bb7c935](https://github.com/esp-admin/app/commit/bb7c935))
- Change type of icon buttons ([2b6a737](https://github.com/esp-admin/app/commit/2b6a737))
- Remove router back button ([c3862ba](https://github.com/esp-admin/app/commit/c3862ba))
- Remove extra ordering on used plugins ([f0f1934](https://github.com/esp-admin/app/commit/f0f1934))
- Do not manually specify font weights ([e72b273](https://github.com/esp-admin/app/commit/e72b273))
- Change messages of confirmation dialogs ([9377e59](https://github.com/esp-admin/app/commit/9377e59))
- Change type of page header's bts ([7f4dbda](https://github.com/esp-admin/app/commit/7f4dbda))

### 🏡 Chore

- Hide node deprecation warnings on build ([b831c39](https://github.com/esp-admin/app/commit/b831c39))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>
- Becem <becem.gharbi@live.com>

## v1.1.1

[compare changes](https://github.com/esp-admin/app/compare/v1.1.0...v1.1.1)

### 💅 Refactors

- Migrate to `nuxt-auth` v3 ([62b20e8](https://github.com/esp-admin/app/commit/62b20e8))
- Update `middleware` on auth pages ([f53be2b](https://github.com/esp-admin/app/commit/f53be2b))
- Update server error messages ([b3dde55](https://github.com/esp-admin/app/commit/b3dde55))
- Add confirmation on device reset ([8b11755](https://github.com/esp-admin/app/commit/8b11755))
- Update route rules ([e561a46](https://github.com/esp-admin/app/commit/e561a46))
- No change ([8ec5626](https://github.com/esp-admin/app/commit/8ec5626))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v1.1.0

[compare changes](https://github.com/esp-admin/app/compare/v1.0.20...v1.1.0)

### 🚀 Enhancements

- **report:** Display app notification on custom report ([60af8b7](https://github.com/esp-admin/app/commit/60af8b7))
- Allow create Release externally with project-scope API Key authorization ([#10](https://github.com/esp-admin/app/pull/10))
- Add copy button on Id inputs ([d745714](https://github.com/esp-admin/app/commit/d745714))
- Integration with GitHub actions for OTA update [docs](https://esp-admin.tn/sdk/usage#updates) ([6185790](https://github.com/esp-admin/app/commit/6185790))

### 🔥 Performance

- Group db queries on a single transaction ([a043ac8](https://github.com/esp-admin/app/commit/a043ac8))
- Concurrently run report tasks ([13f67f8](https://github.com/esp-admin/app/commit/13f67f8))

### 🩹 Fixes

- Do not throw error when Report settings not set ([f707f32](https://github.com/esp-admin/app/commit/f707f32))
- Fix missing device commands ([24a90ac](https://github.com/esp-admin/app/commit/24a90ac))

### 💅 Refactors

- No significant change ([f888b26](https://github.com/esp-admin/app/commit/f888b26))
- Remove endpoints for upload/delete S3 objects ([#8](https://github.com/esp-admin/app/pull/8))
- Code review ([252e9bb](https://github.com/esp-admin/app/commit/252e9bb))
- No significcant chaange ([7caed56](https://github.com/esp-admin/app/commit/7caed56))
- Publish new update mqtt message on server ([#9](https://github.com/esp-admin/app/pull/9))
- Add `published` property on release create response ([1a60278](https://github.com/esp-admin/app/commit/1a60278))
- Log server errors ([5371232](https://github.com/esp-admin/app/commit/5371232))
- Increase API key length to 30 char ([4d8313c](https://github.com/esp-admin/app/commit/4d8313c))
- Reset API key input on successful form submit ([e4c3558](https://github.com/esp-admin/app/commit/e4c3558))
- Change FormKey placeholder ([f870223](https://github.com/esp-admin/app/commit/f870223))
- Display notification on copied to Clipboard ([278c430](https://github.com/esp-admin/app/commit/278c430))
- Autosize description inputs ([565d749](https://github.com/esp-admin/app/commit/565d749))
- Improve layout of Report form ([33ff07f](https://github.com/esp-admin/app/commit/33ff07f))

### 🏡 Chore

- Change max size for upload to 3Mb ([5add387](https://github.com/esp-admin/app/commit/5add387))
- Remove design folder ([fb1aaaa](https://github.com/esp-admin/app/commit/fb1aaaa))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>
- Becem <becem.gharbi@live.com>

## v1.0.20

[compare changes](https://github.com/esp-admin/app/compare/v1.0.19...v1.0.20)

### 🔥 Performance

- Use naive Dialog for delete confirmation ([#7](https://github.com/esp-admin/app/pull/7))

### 🩹 Fixes

- Request email verfication on failed registration with `account-not-verified` error ([b09a078](https://github.com/esp-admin/app/commit/b09a078))

### 💅 Refactors

- Review code ([#6](https://github.com/esp-admin/app/pull/6))
- Replace type warning with error on dialog components ([5b8ae7d](https://github.com/esp-admin/app/commit/5b8ae7d))
- Show updatedAt instead of createdAt on Project & Device cards ([0f6db87](https://github.com/esp-admin/app/commit/0f6db87))
- Return validation fail reason ([e3adb2f](https://github.com/esp-admin/app/commit/e3adb2f))

### 🏡 Chore

- **lint:** Migrate to `@nuxt/eslint` ([f8ea88f](https://github.com/esp-admin/app/commit/f8ea88f))
- Refresh lockfile ([bf0c638](https://github.com/esp-admin/app/commit/bf0c638))
- Refresh lockfile ([8485821](https://github.com/esp-admin/app/commit/8485821))
- Refresh lockfile ([0ced79b](https://github.com/esp-admin/app/commit/0ced79b))
- Refresh lockfile ([045ffeb](https://github.com/esp-admin/app/commit/045ffeb))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>
- Becem <becem.gharbi@live.com>

## v1.0.19

[compare changes](https://github.com/esp-admin/app/compare/v1.0.18...v1.0.19)

### 💅 Refactors

- Change cors impl ([606e28f](https://github.com/esp-admin/app/commit/606e28f))

### 🏡 Chore

- Apply latest changes on nuxt-auth and nuxt-naiveui ([faf6107](https://github.com/esp-admin/app/commit/faf6107))
- Replace nuxt-s3 with @bg-dev/nuxt-s3 ([2f3b01b](https://github.com/esp-admin/app/commit/2f3b01b))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v1.0.18

[compare changes](https://github.com/esp-admin/app/compare/v1.0.17...v1.0.18)

### 🔥 Performance

- **AccountInfo:** Lazy load user's image ([bcbc924](https://github.com/esp-admin/app/commit/bcbc924))

### 💅 Refactors

- Remove `randomString` and create a custom util ([4c58906](https://github.com/esp-admin/app/commit/4c58906))

### 🏡 Chore

- Enable typescriptBundlerResolution ([70ea3ca](https://github.com/esp-admin/app/commit/70ea3ca))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v1.0.17

[compare changes](https://github.com/esp-admin/app/compare/v1.0.16...v1.0.17)

### 🔥 Performance

- Specify font weights ([09b80a3](https://github.com/esp-admin/app/commit/09b80a3))

### 💅 Refactors

- Migrate from `@nuxtjs/google-fonts` to `@nuxt/fonts` ([2589f3b](https://github.com/esp-admin/app/commit/2589f3b))
- Add custom error page ([82f37c9](https://github.com/esp-admin/app/commit/82f37c9))
- Remove pkg info from runtimeConfig ([af9c68c](https://github.com/esp-admin/app/commit/af9c68c))

### 🏡 Chore

- Switch off typescriptBundlerResolution ([d06e0f6](https://github.com/esp-admin/app/commit/d06e0f6))

### ❤️ Contributors

- Becem-gharbi ([@becem-gharbi](http://github.com/becem-gharbi))

## v1.0.16

[compare changes](https://github.com/esp-admin/app/compare/v1.0.15...v1.0.16)

### 🏡 Chore

- Update changes in nuxt-auth@2.4.3 ([79630e6](https://github.com/esp-admin/app/commit/79630e6))
- Upgrade vue (solves navigation issue) ([e50b45e](https://github.com/esp-admin/app/commit/e50b45e))

### ❤️ Contributors

- Becem-gharbi ([@becem-gharbi](http://github.com/becem-gharbi))

## v1.0.15

[compare changes](https://github.com/esp-admin/app/compare/v1.0.14...v1.0.15)

### 💅 Refactors

- Move google fonts settings to /config ([3ac5107](https://github.com/esp-admin/app/commit/3ac5107))
- Move nuxt-security settings to /config ([54e4875](https://github.com/esp-admin/app/commit/54e4875))

### 🏡 Chore

- Remove extra globalThis definition ([35c8ca8](https://github.com/esp-admin/app/commit/35c8ca8))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v1.0.14

[compare changes](https://github.com/esp-admin/app/compare/v1.0.13...v1.0.14)

### 🩹 Fixes

- Solve blocking navigation (>vue@3.4.8) ([77a74ca](https://github.com/esp-admin/app/commit/77a74ca))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v1.0.13

[compare changes](https://github.com/esp-admin/app/compare/v1.0.12...v1.0.13)

### 🔥 Performance

- Only load `highcharts` on client-side ([cc860ad](https://github.com/esp-admin/app/commit/cc860ad))

### 💅 Refactors

- **ui:** Change layout of login form ([015002c](https://github.com/esp-admin/app/commit/015002c))
- **ui:** Change AccountInfo avatar shape ([91c4576](https://github.com/esp-admin/app/commit/91c4576))
- **ui:** Change AccountInfo avatar border color ([ed207c2](https://github.com/esp-admin/app/commit/ed207c2))
- Move theme config to app.config ([7f58740](https://github.com/esp-admin/app/commit/7f58740))

### 🏡 Chore

- Switch to pnpm ([b1cdc9d](https://github.com/esp-admin/app/commit/b1cdc9d))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v1.0.12

[compare changes](https://github.com/esp-admin/app/compare/v1.0.11...v1.0.12)

### 💅 Refactors

- **sidebar:** Remove dividers ([ee7d873](https://github.com/esp-admin/app/commit/ee7d873))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v1.0.11

[compare changes](https://github.com/esp-admin/app/compare/v1.0.10...v1.0.11)

### 🔥 Performance

- Replace NaiveLoadingBar with NuxtLoadingIndicator ([6f21e58](https://github.com/esp-admin/app/commit/6f21e58))

### 💅 Refactors

- **default layout:** Increase logo width ([1347cb3](https://github.com/esp-admin/app/commit/1347cb3))
- **auth layout:** Increase logo width ([10de876](https://github.com/esp-admin/app/commit/10de876))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v1.0.10

[compare changes](https://github.com/esp-admin/app/compare/v1.0.9...v1.0.10)

### 🩹 Fixes

- **api:** Order release deployments by createdAt ([5c50e38](https://github.com/esp-admin/app/commit/5c50e38))

### 💅 Refactors

- Disable loading bar display on navigation ([3182193](https://github.com/esp-admin/app/commit/3182193))
- Disable Layout transition ([9863b42](https://github.com/esp-admin/app/commit/9863b42))
- Always render page content with default layout ([6ede08f](https://github.com/esp-admin/app/commit/6ede08f))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v1.0.9

[compare changes](https://github.com/esp-admin/app/compare/v1.0.8...v1.0.9)

### 🩹 Fixes

- Add projectId to GET releases response ([0af2f70](https://github.com/esp-admin/app/commit/0af2f70))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v1.0.8

[compare changes](https://github.com/esp-admin/app/compare/v1.0.7...v1.0.8)

### 🔥 Performance

- Disable Tailwind exposeConfig in production ([42a73f1](https://github.com/esp-admin/app/commit/42a73f1))

### 💅 Refactors

- Replace nuxt-loading-indicator with naive-ui loading bar ([b40b746](https://github.com/esp-admin/app/commit/b40b746))
- Replace useLoadingBar with useNaiveLoadingBar ([cd30976](https://github.com/esp-admin/app/commit/cd30976))
- Minor refactoring ([4fe32ee](https://github.com/esp-admin/app/commit/4fe32ee))
- Change default layout ([9c5d354](https://github.com/esp-admin/app/commit/9c5d354))
- Change grid breakpoint ([517437f](https://github.com/esp-admin/app/commit/517437f))
- Remove scrollbar hide styles ([79d332e](https://github.com/esp-admin/app/commit/79d332e))
- Display AccountInfo on sidebar ([97475f4](https://github.com/esp-admin/app/commit/97475f4))
- Add Notification to default layout ([79de8b2](https://github.com/esp-admin/app/commit/79de8b2))
- Change GET releases route ([c3ad709](https://github.com/esp-admin/app/commit/c3ad709))
- Change GET deployments route ([d4b4e78](https://github.com/esp-admin/app/commit/d4b4e78))
- Minor refactoring ([ae7199b](https://github.com/esp-admin/app/commit/ae7199b))
- Minor refactoring ([9825744](https://github.com/esp-admin/app/commit/9825744))
- Minor refactoring ([163cfec](https://github.com/esp-admin/app/commit/163cfec))
- Minor refactoring ([757e155](https://github.com/esp-admin/app/commit/757e155))
- Change layout color ([3e66e7d](https://github.com/esp-admin/app/commit/3e66e7d))
- **default layout:** Set `naive-layout-sidebar` as root ([8f32cf5](https://github.com/esp-admin/app/commit/8f32cf5))
- Minor refactoring ([12b7e10](https://github.com/esp-admin/app/commit/12b7e10))

### 🏡 Chore

- Use `@nuxtjs/google-fonts` for handling fonts ([f2ee3c4](https://github.com/esp-admin/app/commit/f2ee3c4))
- Disable `cssnano` on production ([b732956](https://github.com/esp-admin/app/commit/b732956))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v1.0.7

[compare changes](https://github.com/esp-admin/app/compare/v1.0.6...v1.0.7)

### 🩹 Fixes

- **ProjectReleases:** Reset page after clearing search ([8e80f1d](https://github.com/esp-admin/app/commit/8e80f1d))

### 💅 Refactors

- **usePagination:** Minor refactoring ([b181bd2](https://github.com/esp-admin/app/commit/b181bd2))
- **default layout:** Use naive-ui scrollbar over the native one ([4fe854f](https://github.com/esp-admin/app/commit/4fe854f))
- **ReleaseItem:** Disable collapse button if no linked devices found ([a51a488](https://github.com/esp-admin/app/commit/a51a488))
- **Logo:** Set height to 50px ([32b45ad](https://github.com/esp-admin/app/commit/32b45ad))
- **onMessageArrived:** Verify existance of device ([12eeafd](https://github.com/esp-admin/app/commit/12eeafd))
- **device update:** Remove existance check ([d83e5ae](https://github.com/esp-admin/app/commit/d83e5ae))
- Minor refactoring ([f5f895d](https://github.com/esp-admin/app/commit/f5f895d))
- Remove custom error page and use the default ([e33c69b](https://github.com/esp-admin/app/commit/e33c69b))
- **auth layout:** Remove user check ([bccabc6](https://github.com/esp-admin/app/commit/bccabc6))
- Minor refactoring ([6ea61f7](https://github.com/esp-admin/app/commit/6ea61f7))
- Minor refactoring ([59e5531](https://github.com/esp-admin/app/commit/59e5531))
- Hide scrollbar ([3a9ccfc](https://github.com/esp-admin/app/commit/3a9ccfc))

### 🏡 Chore

- **deps-dev:** Bump vite from 4.5.0 to 4.5.1 ([fd79015](https://github.com/esp-admin/app/commit/fd79015))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v1.0.6

[compare changes](https://github.com/esp-admin/app/compare/v1.0.5...v1.0.6)

### 💅 Refactors

- **AccountSessions:** Remove extra fetch transformation ([fe36124](https://github.com/esp-admin/app/commit/fe36124))
- **AccountSessions:** Minor refactoring ([a762abf](https://github.com/esp-admin/app/commit/a762abf))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v1.0.5

[compare changes](https://github.com/esp-admin/app/compare/v1.0.4...v1.0.5)

### 🩹 Fixes

- Fix colorMode transition on login ([ba1166b](https://github.com/esp-admin/app/commit/ba1166b))

### 💅 Refactors

- Remove s3 middleware fixing encoding on netlify ([1b49aad](https://github.com/esp-admin/app/commit/1b49aad))
- **auth layout:** Change styles ([d87b688](https://github.com/esp-admin/app/commit/d87b688))

### 🏡 Chore

- Require node +18 ([d9774c8](https://github.com/esp-admin/app/commit/d9774c8))
- Limit usage of s3 endpoints ([cc77943](https://github.com/esp-admin/app/commit/cc77943))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v1.0.4

[compare changes](https://github.com/esp-admin/app/compare/v1.0.3...v1.0.4)

### 💅 Refactors

- Replace useAuthFetch with useNuxtApp()..fetch ([eba5a36](https://github.com/esp-admin/app/commit/eba5a36))
- **fetch:** Remove extra explicit return type ([52e04a9](https://github.com/esp-admin/app/commit/52e04a9))
- Limit selection on devices and projects responses ([cfd8a6e](https://github.com/esp-admin/app/commit/cfd8a6e))
- Limit selection on releases and deployments endpoints ([e2ff987](https://github.com/esp-admin/app/commit/e2ff987))
- Limit selection on mqtt and report endpoints ([69307f6](https://github.com/esp-admin/app/commit/69307f6))
- Limit selection on device endpoints ([fc88eb4](https://github.com/esp-admin/app/commit/fc88eb4))
- **AccountSessions:** Add loading bar ([2001ceb](https://github.com/esp-admin/app/commit/2001ceb))
- **FormButtons:** Reverse order ([2f3c519](https://github.com/esp-admin/app/commit/2f3c519))
- **cards:** Truncate description ([005652a](https://github.com/esp-admin/app/commit/005652a))
- Move logos to assets ([16270f6](https://github.com/esp-admin/app/commit/16270f6))
- **useReport:** Validate deploymentId before updating deployment status ([9c97143](https://github.com/esp-admin/app/commit/9c97143))
- Minor refactoring ([0cc83a9](https://github.com/esp-admin/app/commit/0cc83a9))

### 🏡 Chore

- Add typecheck to release script ([0882aa4](https://github.com/esp-admin/app/commit/0882aa4))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v1.0.3

[compare changes](https://github.com/esp-admin/app/compare/v1.0.2...v1.0.3)

### 💅 Refactors

- Move transition styles to assets ([720b3e8](https://github.com/esp-admin/app/commit/720b3e8))
- Force light mode on auth pages ([3da9169](https://github.com/esp-admin/app/commit/3da9169))
- Minor refactoring ([1fd48a5](https://github.com/esp-admin/app/commit/1fd48a5))

### 🏡 Chore

- Update comment ([8ecaa69](https://github.com/esp-admin/app/commit/8ecaa69))
- Change rate limit settings on auth endpoints ([9532a61](https://github.com/esp-admin/app/commit/9532a61))
- Adjust rate limiting on auth endpoints ([8e26e4a](https://github.com/esp-admin/app/commit/8e26e4a))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v1.0.2

[compare changes](https://github.com/esp-admin/app/compare/v1.0.1...v1.0.2)

### 🩹 Fixes

- **Realtime:** Retain log command ([dcd69c9](https://github.com/esp-admin/app/commit/dcd69c9))

### 💅 Refactors

- Change Pagination style ([258d3db](https://github.com/esp-admin/app/commit/258d3db))

### 🏡 Chore

- Disable devtools ([80d8fa5](https://github.com/esp-admin/app/commit/80d8fa5))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v1.0.1

[compare changes](https://github.com/esp-admin/app/compare/v1.0.0...v1.0.1)

### 🩹 Fixes

- Fix useNaiveLoadingBar scope ([d931ae6](https://github.com/esp-admin/app/commit/d931ae6))
- **TitleDate:** Clear timer on unmounted ([2890398](https://github.com/esp-admin/app/commit/2890398))

### 💅 Refactors

- Follow MQTT.js v5.2 import ([2bf92f5](https://github.com/esp-admin/app/commit/2bf92f5))
- **loadingBar:** Set a unique color for navigation and data fetching ([c8a9f85](https://github.com/esp-admin/app/commit/c8a9f85))

### 🏡 Chore

- Upgrade nuxt-s3 to latest ([b7f1cdb](https://github.com/esp-admin/app/commit/b7f1cdb))
- Upgrade nuxt-s3 to latest ([53011b6](https://github.com/esp-admin/app/commit/53011b6))

### ❤️ Contributors

- Becem-gharbi ([@becem-gharbi](http://github.com/becem-gharbi))

## v1.0.0

[compare changes](https://github.com/esp-admin/app/compare/v1.2.3-rc...main)

### 💅 Refactors

- **ReleaseItem:** Add collapse button ([eec6916](https://github.com/esp-admin/app/commit/eec6916))
- **IconButton:** Remove tooltip ([cbe3f89](https://github.com/esp-admin/app/commit/cbe3f89))
- **Icons:** Group icon names in icons utility ([9cafd0a](https://github.com/esp-admin/app/commit/9cafd0a))
- **Icons:** Change names ([f5f1c67](https://github.com/esp-admin/app/commit/f5f1c67))
- **ReleaseItem:** Auto expand on release create ([8974694](https://github.com/esp-admin/app/commit/8974694))
- **ReleaseDevices:** Change btn type ([ace9a23](https://github.com/esp-admin/app/commit/ace9a23))

### 🏡 Chore

- **release:** V1.0.0 ([e682e40](https://github.com/esp-admin/app/commit/e682e40))

### ❤️ Contributors

- Becem-gharbi ([@becem-gharbi](http://github.com/becem-gharbi))

## v1.2.3-rc

[compare changes](https://github.com/esp-admin/app/compare/v1.2.2-rc...v1.2.3-rc)

### 🩹 Fixes

- **removeArrayElByKey:** Remove all elements passing condition ([14d6009](https://github.com/esp-admin/app/commit/14d6009))
- Hide pagination on empty list ([893606c](https://github.com/esp-admin/app/commit/893606c))
- Remove unused project field from get device endpoint ([2af3a8d](https://github.com/esp-admin/app/commit/2af3a8d))
- **usePagination:** Fix case page exceed pageCount ([f1e0fab](https://github.com/esp-admin/app/commit/f1e0fab))

### 💅 Refactors

- **ui:** Refactor cards ([1c4570f](https://github.com/esp-admin/app/commit/1c4570f))
- **textarea:** Remove autosize ([43f4c84](https://github.com/esp-admin/app/commit/43f4c84))
- Add pagination to releases and deployments ([18bc2b3](https://github.com/esp-admin/app/commit/18bc2b3))
- Disable auto expand of release card ([5e8f432](https://github.com/esp-admin/app/commit/5e8f432))
- Remove tooltip on device and deployment status ([e587d68](https://github.com/esp-admin/app/commit/e587d68))
- Minor refactoring ([04a26d1](https://github.com/esp-admin/app/commit/04a26d1))

### 🏡 Chore

- **design:** Re-design cards ([0ce6397](https://github.com/esp-admin/app/commit/0ce6397))
- Move empty.svg to assets ([cdf7d00](https://github.com/esp-admin/app/commit/cdf7d00))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v1.2.2-rc

[compare changes](https://github.com/esp-admin/app/compare/v1.2.1-rc...v1.2.2-rc)

### 🔥 Performance

- **useRelease:** Cache findDeployments result ([2c1a611](https://github.com/esp-admin/app/commit/2c1a611))

### 💅 Refactors

- **useDeployment:** Remove removeByRelease ([858bd94](https://github.com/esp-admin/app/commit/858bd94))
- **report:** Add deviceId and projectId to body of custom report webhook ([37e490f](https://github.com/esp-admin/app/commit/37e490f))
- **report:** Add device link to email template ([c62758f](https://github.com/esp-admin/app/commit/c62758f))
- **passwordReset:** Update email template ([2d68f7a](https://github.com/esp-admin/app/commit/2d68f7a))
- **verifyEmail:** Update email template ([f9da56a](https://github.com/esp-admin/app/commit/f9da56a))
- Create filteredArrayByKey utility ([a42d662](https://github.com/esp-admin/app/commit/a42d662))
- **ProjectReleases:** Add scrollbar to releases list ([7995ed2](https://github.com/esp-admin/app/commit/7995ed2))
- Remove vertical margins on empty result ([151cc52](https://github.com/esp-admin/app/commit/151cc52))

### 🏡 Chore

- Update main link in tmail templates ([aeca055](https://github.com/esp-admin/app/commit/aeca055))

### ❤️ Contributors

- Becem-gharbi ([@becem-gharbi](http://github.com/becem-gharbi))

## v1.2.1-rc

[compare changes](https://github.com/esp-admin/app/compare/v1.2.0-rc...v1.2.1-rc)

### 🩹 Fixes

- **DeviceVariables:** Handle case of undefined project variables ([f649c2a](https://github.com/esp-admin/app/commit/f649c2a))
- Remove unused deployments field from get device endpoint ([f94dd00](https://github.com/esp-admin/app/commit/f94dd00))

### ❤️ Contributors

- Becem-gharbi ([@becem-gharbi](http://github.com/becem-gharbi))

## v1.2.0-rc

[compare changes](https://github.com/esp-admin/app/compare/v1.1.6-rc...v2.0.0-rc)

### 🔥 Performance

- Fetch devices on loggedIn hook ([b881619](https://github.com/esp-admin/app/commit/b881619))
- **useReport:** Avoid device status update if not changed ([333da33](https://github.com/esp-admin/app/commit/333da33))

### 🩹 Fixes

- Authorize upload by userId check ([ce986fd](https://github.com/esp-admin/app/commit/ce986fd))
- **useDeployment:** Fetch deployments on update ([bf93e16](https://github.com/esp-admin/app/commit/bf93e16))
- Handle undefined loadingBar ([8ea8511](https://github.com/esp-admin/app/commit/8ea8511))
- **useReport:** Fix parsing on handleStatus ([1b23731](https://github.com/esp-admin/app/commit/1b23731))

### 💅 Refactors

- **ReleaseItem:** Change identifiers ([c257497](https://github.com/esp-admin/app/commit/c257497))
- ⚠️ Change S3 key naming ([de7b303](https://github.com/esp-admin/app/commit/de7b303))
- Reduce Empty image size ([57027b8](https://github.com/esp-admin/app/commit/57027b8))
- **Navbar:** Place horizontal menu left ([f15fcfc](https://github.com/esp-admin/app/commit/f15fcfc))
- Reduce default icons size to 18px ([4bbd957](https://github.com/esp-admin/app/commit/4bbd957))
- **models:** Delete Releases on Project delete ([700b304](https://github.com/esp-admin/app/commit/700b304))
- **useProject:** Clear releases and deployments on delete ([81e0990](https://github.com/esp-admin/app/commit/81e0990))
- **useRelease:** Remove release files on removeAll ([2d1b112](https://github.com/esp-admin/app/commit/2d1b112))
- Minor refactoring ([502916d](https://github.com/esp-admin/app/commit/502916d))
- Create removeArrayElByKey utility ([e970cc7](https://github.com/esp-admin/app/commit/e970cc7))
- Minor refactoring ([0c4438a](https://github.com/esp-admin/app/commit/0c4438a))
- Minor refactoring ([b08d44e](https://github.com/esp-admin/app/commit/b08d44e))
- Increase gaps ([d2bd007](https://github.com/esp-admin/app/commit/d2bd007))

#### ⚠️ Breaking Changes

- ⚠️ Change S3 key naming ([de7b303](https://github.com/esp-admin/app/commit/de7b303))

### ❤️ Contributors

- Becem-gharbi ([@becem-gharbi](http://github.com/becem-gharbi))

## v1.1.6-rc

[compare changes](https://github.com/esp-admin/app/compare/v1.1.5-rc...v1.1.6-rc)

### 🩹 Fixes

- **models:** Delete deployments on deleting device and release ([26a3936](https://github.com/esp-admin/app/commit/26a3936))
- **useDeployment:** Clear state on Release delete ([0c23967](https://github.com/esp-admin/app/commit/0c23967))
- **useDeployment:** Clear state on Device delete ([103bfee](https://github.com/esp-admin/app/commit/103bfee))
- **useLog:** Remove state on Device delete ([d6cd965](https://github.com/esp-admin/app/commit/d6cd965))

### 💅 Refactors

- **useDevice:** Create findLinked ([ab0fbe3](https://github.com/esp-admin/app/commit/ab0fbe3))
- **useDevice:** Minor refactoring ([832fd31](https://github.com/esp-admin/app/commit/832fd31))
- **useProject:** Minor refactoring ([d5ef4e0](https://github.com/esp-admin/app/commit/d5ef4e0))
- **useLog:** Minor refactoring ([a4dce29](https://github.com/esp-admin/app/commit/a4dce29))
- **useMqtt:** Minor refactoring ([8811fb7](https://github.com/esp-admin/app/commit/8811fb7))
- **useRelease:** Minor refactoring ([789792a](https://github.com/esp-admin/app/commit/789792a))
- **useDeployment:** Minor refactoring ([2fb3629](https://github.com/esp-admin/app/commit/2fb3629))
- Minor refactoring ([1f64b83](https://github.com/esp-admin/app/commit/1f64b83))
- **ReleaseItem:** Disable deploy now btn on empty devices list ([0665997](https://github.com/esp-admin/app/commit/0665997))
- Minor refactoring ([cd826c0](https://github.com/esp-admin/app/commit/cd826c0))

### 📖 Documentation

- Update README.md ([d951f27](https://github.com/esp-admin/app/commit/d951f27))

### ❤️ Contributors

- Becem-gharbi ([@becem-gharbi](http://github.com/becem-gharbi))
- Becem ([@becem-gharbi](http://github.com/becem-gharbi))

## v1.1.5-rc

[compare changes](https://github.com/esp-admin/app/compare/v1.1.4-rc...v1.1.5-rc)

### 🔥 Performance

- Move Notification from root to default layout ([4d9dabf](https://github.com/esp-admin/app/commit/4d9dabf))

### 🩹 Fixes

- Prevent mqtt disconnect when running in background with power saver on ([a70cafc](https://github.com/esp-admin/app/commit/a70cafc))
- **Realtime:** Disable button when action has no effect ([2b73265](https://github.com/esp-admin/app/commit/2b73265))

### 💅 Refactors

- Minor refactoring ([43703ec](https://github.com/esp-admin/app/commit/43703ec))
- Add loading bar on sessions tab ([5d491c9](https://github.com/esp-admin/app/commit/5d491c9))
- Add loading bar on Report tab ([3f90947](https://github.com/esp-admin/app/commit/3f90947))

### 🏡 Chore

- Update Dockerfile ([0f41e76](https://github.com/esp-admin/app/commit/0f41e76))

### ❤️ Contributors

- Becem-gharbi ([@becem-gharbi](http://github.com/becem-gharbi))
- Becem ([@becem-gharbi](http://github.com/becem-gharbi))

## v1.1.4-rc

[compare changes](https://github.com/esp-admin/app/compare/v1.1.3-rc...v1.1.4-rc)

### 🔥 Performance

- Move n-message-provider from root ([15838d7](https://github.com/esp-admin/app/commit/15838d7))
- Lazy load notifications ([761efc5](https://github.com/esp-admin/app/commit/761efc5))
- Fetch all devices on loggedIn hook ([8b07cd6](https://github.com/esp-admin/app/commit/8b07cd6))

### 🩹 Fixes

- Fix global is not defined ([0731c9b](https://github.com/esp-admin/app/commit/0731c9b))
- **AccountPassword:** Add missing autocomplete attribute ([e8ea075](https://github.com/esp-admin/app/commit/e8ea075))
- Add missing html tags ([f415f48](https://github.com/esp-admin/app/commit/f415f48))

### 💅 Refactors

- Remove NButton circle form ([988c85c](https://github.com/esp-admin/app/commit/988c85c))
- **useMqtt:** Remove unused mqtt member return ([13e617d](https://github.com/esp-admin/app/commit/13e617d))
- **useMqtt:** Cache fetch results in NuxtData ([522a5ce](https://github.com/esp-admin/app/commit/522a5ce))
- **useReport:** Cache fetch results in NuxtData ([5d5ce35](https://github.com/esp-admin/app/commit/5d5ce35))
- **useProject:** Cache fetch results in NuxtData ([8c53f84](https://github.com/esp-admin/app/commit/8c53f84))
- **useDevice:** Cache fetch results in NuxtData ([8de7a4b](https://github.com/esp-admin/app/commit/8de7a4b))
- **useRelease:** Cache fetch results in NuxtData ([e536e6b](https://github.com/esp-admin/app/commit/e536e6b))
- **useDeployment:** Cache fetch results in NuxtData ([e807f61](https://github.com/esp-admin/app/commit/e807f61))
- Refresh fetch cache on falsy data ([840a73a](https://github.com/esp-admin/app/commit/840a73a))
- Remove extra destructure on find and findOne ([b20761c](https://github.com/esp-admin/app/commit/b20761c))
- **NTab:** Remove animated behaviour ([a4c95fd](https://github.com/esp-admin/app/commit/a4c95fd))
- Remove n-message-provider ([095041c](https://github.com/esp-admin/app/commit/095041c))
- Add loading indicator on deployments and releases fetch ([92376dc](https://github.com/esp-admin/app/commit/92376dc))
- Minor refactoring ([a02bf55](https://github.com/esp-admin/app/commit/a02bf55))
- **DeviceRealtime:** Add space between logs ([b3d6ec1](https://github.com/esp-admin/app/commit/b3d6ec1))
- **realtime:** Display device status via borderColor ([a45bf88](https://github.com/esp-admin/app/commit/a45bf88))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v1.1.3-rc

[compare changes](https://github.com/esp-admin/app/compare/v1.1.2-rc...v1.1.3-rc)

### 🔥 Performance

- Set appropriate logo dimensions ([519e302](https://github.com/esp-admin/app/commit/519e302))

### 💅 Refactors

- **Navbar:** Remove lazy loading dropdown ([e310e29](https://github.com/esp-admin/app/commit/e310e29))

### 📦 Build

- Add ci workflow ([8f9dda5](https://github.com/esp-admin/app/commit/8f9dda5))
- Trigger ci on release ([d9862b0](https://github.com/esp-admin/app/commit/d9862b0))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v1.1.2-rc

[compare changes](https://github.com/esp-admin/app/compare/v1.1.1-rc...v1.1.2-rc)

### 🩹 Fixes

- Allow only one file upload on create release ([1d3345e](https://github.com/esp-admin/app/commit/1d3345e))
- **TitleDate:** Update each 10 seconds ([25e5252](https://github.com/esp-admin/app/commit/25e5252))

### 💅 Refactors

- Follow MQTT.js vite setup ([71441da](https://github.com/esp-admin/app/commit/71441da))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v1.1.1-rc

[compare changes](https://github.com/esp-admin/app/compare/v1.1.0-rc...v1.1.1-rc)

### 🩹 Fixes

- Fix relation between deployment and device ([8883c01](https://github.com/esp-admin/app/commit/8883c01))

### 🏡 Chore

- Add info api endpoint ([6a51417](https://github.com/esp-admin/app/commit/6a51417))
- Add missing prisma error resolvers ([0e7d3fe](https://github.com/esp-admin/app/commit/0e7d3fe))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v1.1.0-rc

[compare changes](https://github.com/esp-admin/app/compare/v0.3.1...v1.1.0-rc)

### 🚀 Enhancements

- Auto expand of release card after creation ([87eddb8](https://github.com/esp-admin/app/commit/87eddb8))

### 🔥 Performance

- Move s3 encoding fix to middleware ([4c7f340](https://github.com/esp-admin/app/commit/4c7f340))
- Cache s3 objects by setting header instead of route rules ([aad7b31](https://github.com/esp-admin/app/commit/aad7b31))

### 🩹 Fixes

- Run Sync on loggedIn and stop on loggedOut ([b1404a1](https://github.com/esp-admin/app/commit/b1404a1))

### 🏡 Chore

- General fixes and optimizations ([a0ee091](https://github.com/esp-admin/app/commit/a0ee091))
- Increase MQTT reconnect period to 10 sec ([6d42cd5](https://github.com/esp-admin/app/commit/6d42cd5))
- Add rc suffix in changelogen ([bef1c47](https://github.com/esp-admin/app/commit/bef1c47))
- Bump version to 1.0.0 ([e9aa925](https://github.com/esp-admin/app/commit/e9aa925))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v0.3.1

[compare changes](https://github.com/esp-admin/app/compare/v0.3.0...v0.3.1)

### 🔥 Performance

- Load MQTT.js dynamically ([da25735](https://github.com/esp-admin/app/commit/da25735))

### 🩹 Fixes

- Return success on not found settings ([9754c33](https://github.com/esp-admin/app/commit/9754c33))
- Add client-side validation on profile form ([45810e2](https://github.com/esp-admin/app/commit/45810e2))

### 💅 Refactors

- Remove modals titles ([9935051](https://github.com/esp-admin/app/commit/9935051))
- Remove Footer ([c4ff4ff](https://github.com/esp-admin/app/commit/c4ff4ff))
- Change required error message ([099ecb2](https://github.com/esp-admin/app/commit/099ecb2))
- Multi refactor of forms (rules, messages, code) ([b4d1bc9](https://github.com/esp-admin/app/commit/b4d1bc9))
- Change Card boxShadow ([b790a84](https://github.com/esp-admin/app/commit/b790a84))

### 🏡 Chore

- Update .dockerignore ([5b66057](https://github.com/esp-admin/app/commit/5b66057))
- Change origin ([534fded](https://github.com/esp-admin/app/commit/534fded))
- Change favicon bg to white ([e9ab8d9](https://github.com/esp-admin/app/commit/e9ab8d9))
- Remove s3 cache for now ([44e1b89](https://github.com/esp-admin/app/commit/44e1b89))
- Change favicon border radius ([de122b5](https://github.com/esp-admin/app/commit/de122b5))
- Update example.env ([056895c](https://github.com/esp-admin/app/commit/056895c))
- Remove extra hoverable state ([795052f](https://github.com/esp-admin/app/commit/795052f))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v0.3.0

[compare changes](https://github.com/esp-admin/app/compare/v0.2.14...v0.3.0)

### 🚀 Enhancements

- Create sql prisma schema ([6c255b2](https://github.com/esp-admin/app/commit/6c255b2))

### 🔥 Performance

- Remove userId from object upload path ([5940598](https://github.com/esp-admin/app/commit/5940598))
- Remove Bugsnag ([af9126e](https://github.com/esp-admin/app/commit/af9126e))
- Remove vite pwa ([84baa2d](https://github.com/esp-admin/app/commit/84baa2d))
- Serve logos from public instead of assets ([0a56dee](https://github.com/esp-admin/app/commit/0a56dee))

### 🩹 Fixes

- Throw error on unfound unique entity ([14d4698](https://github.com/esp-admin/app/commit/14d4698))
- Set status code to 404 of unfound resource ([f149c66](https://github.com/esp-admin/app/commit/f149c66))
- **report:** Fix server-side optional inputs ([6aa6d61](https://github.com/esp-admin/app/commit/6aa6d61))

### 💅 Refactors

- Move regexs to utils ([d52cbdd](https://github.com/esp-admin/app/commit/d52cbdd))
- Replace JSON.parse with destr ([ebc2ad6](https://github.com/esp-admin/app/commit/ebc2ad6))

### 📦 Build

- Add prisma generate command ([4994f6e](https://github.com/esp-admin/app/commit/4994f6e))

### 🏡 Chore

- ⚠️ Change ids validation regex ([7749e4f](https://github.com/esp-admin/app/commit/7749e4f))
- Update mongodb schema to insure compatibility with sql schema ([1bdad00](https://github.com/esp-admin/app/commit/1bdad00))
- Add prisma npm scripts ([1fdce0a](https://github.com/esp-admin/app/commit/1fdce0a))
- Add prisma migrations folder to gitignore ([50b8f28](https://github.com/esp-admin/app/commit/50b8f28))
- Replace logo path on email templates ([8052940](https://github.com/esp-admin/app/commit/8052940))
- Delete prisma/migrations directory ([2ea7545](https://github.com/esp-admin/app/commit/2ea7545))
- **design:** Update ERD ([d00d475](https://github.com/esp-admin/app/commit/d00d475))
- Load db url from env on sql schema ([3e01ed0](https://github.com/esp-admin/app/commit/3e01ed0))

#### ⚠️ Breaking Changes

- ⚠️ Change ids validation regex ([7749e4f](https://github.com/esp-admin/app/commit/7749e4f))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>
- Becem <becem.gharbi@live.com>

## v0.2.14

[compare changes](https://github.com/esp-admin/app/compare/v0.2.13...v0.2.14)

### 🩹 Fixes

- Avoid sending file on profile update form ([ecb8def](https://github.com/esp-admin/app/commit/ecb8def))

### 💅 Refactors

- **profile:** Remove unused loading state ([c54cfc4](https://github.com/esp-admin/app/commit/c54cfc4))
- Add reset btn to password change form ([9e5f728](https://github.com/esp-admin/app/commit/9e5f728))

### 🏡 Chore

- Upgrade nuxt-s3 ([d37537a](https://github.com/esp-admin/app/commit/d37537a))
- Upgrade nuxt-s3 to latest ([09b2edf](https://github.com/esp-admin/app/commit/09b2edf))
- Update example.env ([a05e8f4](https://github.com/esp-admin/app/commit/a05e8f4))
- Remove NUXT_SECURITY_CORS_HANDLER_ORIGIN env ([c3983e7](https://github.com/esp-admin/app/commit/c3983e7))
- **s3:** Set upload max size ([d4110f0](https://github.com/esp-admin/app/commit/d4110f0))
- Use s3 built-in cors handler instead of nuxt-security ([d1dcffa](https://github.com/esp-admin/app/commit/d1dcffa))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v0.2.13

[compare changes](https://github.com/esp-admin/app/compare/v0.2.12...v0.2.13)

### 🔥 Performance

- Cache s3 objects on client-side instead of CDN ([99e150e](https://github.com/esp-admin/app/commit/99e150e))

### 💅 Refactors

- Minor UI refactoring ([3164e42](https://github.com/esp-admin/app/commit/3164e42))
- Minor UI refactoring ([dff49bb](https://github.com/esp-admin/app/commit/dff49bb))

### 🏡 Chore

- Remove provided Bugsnag instance ([deb1d2b](https://github.com/esp-admin/app/commit/deb1d2b))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v0.2.12

[compare changes](https://github.com/esp-admin/app/compare/v0.2.11...v0.2.12)

### 🚀 Enhancements

- **ReleaseItem:** Display devices with deployment status ([570c446](https://github.com/esp-admin/app/commit/570c446))

### 🩹 Fixes

- Fix potential viewport overflow ([ff4172e](https://github.com/esp-admin/app/commit/ff4172e))

### 💅 Refactors

- **profile:** Change upload component ([314ca43](https://github.com/esp-admin/app/commit/314ca43))
- Set placeholder for search inputs ([1cae069](https://github.com/esp-admin/app/commit/1cae069))
- Minor UI refactoring ([95d26f6](https://github.com/esp-admin/app/commit/95d26f6))

### 🏡 Chore

- Replace build:docker script to release:docker ([02c88d5](https://github.com/esp-admin/app/commit/02c88d5))
- **design:** Update ERD ([0c5b143](https://github.com/esp-admin/app/commit/0c5b143))
- **pwa:** Disable devOptions ([2d437af](https://github.com/esp-admin/app/commit/2d437af))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v0.2.11

[compare changes](https://github.com/esp-admin/app/compare/v0.2.10...v0.2.11)

### 🚀 Enhancements

- **Realtime:** Add clear logs button ([2e6a911](https://github.com/esp-admin/app/commit/2e6a911))
- **realtime:** Add loading indicator when device connected ([15191dc](https://github.com/esp-admin/app/commit/15191dc))
- Display status of latest deployment via favicon ([1d43926](https://github.com/esp-admin/app/commit/1d43926))

### 🔥 Performance

- Only force mqtt reconnection on document visibility change ([2346b44](https://github.com/esp-admin/app/commit/2346b44))
- Only run sync task on app mounted ([2bd8f3b](https://github.com/esp-admin/app/commit/2bd8f3b))

### 🩹 Fixes

- **mqtt:** Update connected on connect listener ([d3952e6](https://github.com/esp-admin/app/commit/d3952e6))
- Reset favicon when leaving deployment tab ([e11c0c8](https://github.com/esp-admin/app/commit/e11c0c8))

### 💅 Refactors

- **createPrismaError:** Add relation violation error message ([69936d9](https://github.com/esp-admin/app/commit/69936d9))
- Use n-page-header ([6514ced](https://github.com/esp-admin/app/commit/6514ced))
- Set default Logo width to 107px ([42164cf](https://github.com/esp-admin/app/commit/42164cf))
- Create TooltipIconButton ([3daac0c](https://github.com/esp-admin/app/commit/3daac0c))
- Update favicon via Head component ([fdd465c](https://github.com/esp-admin/app/commit/fdd465c))
- Avoid useHead to update favicon instead rely on native ([c6f2578](https://github.com/esp-admin/app/commit/c6f2578))
- Create favicon link tag if not already exists ([2bcfd6a](https://github.com/esp-admin/app/commit/2bcfd6a))

### 🏡 Chore

- **pwa:** Set devOptions to true ([f463803](https://github.com/esp-admin/app/commit/f463803))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v0.2.10

[compare changes](https://github.com/esp-admin/app/compare/v0.2.9...v0.2.10)

### 🩹 Fixes

- **deployment:** Change stale started status to failed on 3 min of timeout ([8a9412e](https://github.com/esp-admin/app/commit/8a9412e))
- Force mqtt reconnection ([52cf38f](https://github.com/esp-admin/app/commit/52cf38f))

### 💅 Refactors

- Remove unused global styles ([59240d4](https://github.com/esp-admin/app/commit/59240d4))
- Expose zod as server utility for auto-import ([7222af6](https://github.com/esp-admin/app/commit/7222af6))
- **modals:** Use title prop ([131413c](https://github.com/esp-admin/app/commit/131413c))
- **modals:** Use title prop ([637aafd](https://github.com/esp-admin/app/commit/637aafd))
- Update auth layout ([5097b06](https://github.com/esp-admin/app/commit/5097b06))

### 🏡 Chore

- Upgrade dependencies ([beef3d7](https://github.com/esp-admin/app/commit/beef3d7))
- Set default color mode to light instead of system ([1869150](https://github.com/esp-admin/app/commit/1869150))
- Upgrade nuxt-auth ([1ecfe3f](https://github.com/esp-admin/app/commit/1ecfe3f))
- Change user profile patch api route ([6643e2e](https://github.com/esp-admin/app/commit/6643e2e))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v0.2.9

[compare changes](https://github.com/esp-admin/app/compare/v0.2.8...v0.2.9)

### 🔥 Performance

- Avoid wait mqtt connection on auth:loggedIn hook ([f6bff55](https://github.com/esp-admin/app/commit/f6bff55))

### 🩹 Fixes

- **pwa:** Disable navigateFallback ([e50ade4](https://github.com/esp-admin/app/commit/e50ade4))

### 🏡 Chore

- **pwa:** Add all possible icon sizes ([33251af](https://github.com/esp-admin/app/commit/33251af))
- **pwa:** Add description to manifest ([4c7f6d9](https://github.com/esp-admin/app/commit/4c7f6d9))
- Add missing theme-color meta tag ([8033ab7](https://github.com/esp-admin/app/commit/8033ab7))
- Create custom email templates for email verification and password reset ([c1a405e](https://github.com/esp-admin/app/commit/c1a405e))
- Update email template of custom report ([cbaa284](https://github.com/esp-admin/app/commit/cbaa284))
- Allow cross origin requests on pwa icons ([1c32eae](https://github.com/esp-admin/app/commit/1c32eae))
- Update email templates ([fea3e66](https://github.com/esp-admin/app/commit/fea3e66))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v0.2.8

[compare changes](https://github.com/esp-admin/app/compare/v0.2.7...v0.2.8)

### 🩹 Fixes

- Hide and auto-generate device API Key ([98a5930](https://github.com/esp-admin/app/commit/98a5930))
- **device metadata:** Fix name required error message ([619d6d8](https://github.com/esp-admin/app/commit/619d6d8))
- Hash device API key ([df939d5](https://github.com/esp-admin/app/commit/df939d5))

### 💅 Refactors

- **FormKey:** Remove message display ([98aaf76](https://github.com/esp-admin/app/commit/98aaf76))
- **FormKey:** Remove extra state ([392c201](https://github.com/esp-admin/app/commit/392c201))
- Group uploaded files by user ([29ffe0d](https://github.com/esp-admin/app/commit/29ffe0d))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v0.2.7

[compare changes](https://github.com/esp-admin/app/compare/v0.2.6...v0.2.7)

### 🚀 Enhancements

- **realtime:** Save logs per-device with no reset after tab close ([eb61445](https://github.com/esp-admin/app/commit/eb61445))

### 🔥 Performance

- Import MQTT.js with tree-shaking instead of the complete bundle ([d55f3cd](https://github.com/esp-admin/app/commit/d55f3cd))

### 🩹 Fixes

- **realtime:** Disable logs on window close ([9919682](https://github.com/esp-admin/app/commit/9919682))
- **realtime:** Scroll logs to bottom on mounted ([e679696](https://github.com/esp-admin/app/commit/e679696))

### 💅 Refactors

- **MQTT:** Set keepalive and reconnectPeriod options ([6347a51](https://github.com/esp-admin/app/commit/6347a51))
- Rename ([b4e2c6b](https://github.com/esp-admin/app/commit/b4e2c6b))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v0.2.6

[compare changes](https://github.com/esp-admin/app/compare/v0.2.5...v0.2.6)

### 🚀 Enhancements

- Add project btn link on device page ([8fbd32e](https://github.com/esp-admin/app/commit/8fbd32e))

### 🩹 Fixes

- **input:** Disable background autofill ([acc1f80](https://github.com/esp-admin/app/commit/acc1f80))

### 💅 Refactors

- Update auth layout ([c37a470](https://github.com/esp-admin/app/commit/c37a470))
- Create createUnauthorizedError utility ([3655f83](https://github.com/esp-admin/app/commit/3655f83))
- **theme:** Comment fontSize properties ([f4a6959](https://github.com/esp-admin/app/commit/f4a6959))
- Update auth layout ([4ff0a28](https://github.com/esp-admin/app/commit/4ff0a28))
- Update o results image ([d4f8021](https://github.com/esp-admin/app/commit/d4f8021))
- Update default layout ([0700524](https://github.com/esp-admin/app/commit/0700524))
- Disable forced light mode on auth pages ([f715e41](https://github.com/esp-admin/app/commit/f715e41))
- Update auth layout ([06e2dcb](https://github.com/esp-admin/app/commit/06e2dcb))
- Set default Logo width to 105px ([22c2d96](https://github.com/esp-admin/app/commit/22c2d96))
- Update auth layout ([4dee7a9](https://github.com/esp-admin/app/commit/4dee7a9))

### 🏡 Chore

- Add funding btn ([59fd444](https://github.com/esp-admin/app/commit/59fd444))
- Update Dockerfile ([715bbc4](https://github.com/esp-admin/app/commit/715bbc4))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>
- Becem Gharbi <becem.gharbi@live.com>

## v0.2.5

[compare changes](https://github.com/esp-admin/app/compare/v0.2.4...v0.2.5)

### 🩹 Fixes

- **settings:** Replace uriTCP empty string with undefined ([4fd42ef](https://github.com/esp-admin/app/commit/4fd42ef))
- **settings:** Fix mqtt form validator return type ([064c878](https://github.com/esp-admin/app/commit/064c878))
- **Device variables:** Fix undefined model ([4bb7f03](https://github.com/esp-admin/app/commit/4bb7f03))
- **project variables:** Always display buttons ([08582fc](https://github.com/esp-admin/app/commit/08582fc))
- **form item:** Hide tooltip if description empty ([119da13](https://github.com/esp-admin/app/commit/119da13))
- **project commands:** Always show buttons ([1290d73](https://github.com/esp-admin/app/commit/1290d73))
- Accept empty string as optional in zod validation ([d529fd7](https://github.com/esp-admin/app/commit/d529fd7))

### 💅 Refactors

- **mqtt plugin:** Remove on connect listener ([a24b4c2](https://github.com/esp-admin/app/commit/a24b4c2))
- **settings:** Add mqtt inputs placeholders ([961b5a4](https://github.com/esp-admin/app/commit/961b5a4))
- **client-side validation:** Add url validation and change error messages ([8b09a14](https://github.com/esp-admin/app/commit/8b09a14))
- Use nitro error hook to handle errors ([331077a](https://github.com/esp-admin/app/commit/331077a))
- Create createPrismaError utility to format errors ([9414630](https://github.com/esp-admin/app/commit/9414630))
- Add missing client-side error messages ([dc12805](https://github.com/esp-admin/app/commit/dc12805))
- Comment theme height properties ([c91f230](https://github.com/esp-admin/app/commit/c91f230))
- Comment unused theme properties ([6b58eba](https://github.com/esp-admin/app/commit/6b58eba))
- Set DeviceItem & ProjectItem heights to full ([5ebb620](https://github.com/esp-admin/app/commit/5ebb620))
- Replace NTreeSelect with NSelect ([91c0c54](https://github.com/esp-admin/app/commit/91c0c54))

### 📖 Documentation

- Update README ([5a6025e](https://github.com/esp-admin/app/commit/5a6025e))

### 🏡 Chore

- Upgrade dependencies ([2acdeee](https://github.com/esp-admin/app/commit/2acdeee))
- Disable devtools ([a83b8ef](https://github.com/esp-admin/app/commit/a83b8ef))
- **eslint:** Disable vue/multi-word-component-names ([9b70651](https://github.com/esp-admin/app/commit/9b70651))
- Fix lint issues ([4702cf8](https://github.com/esp-admin/app/commit/4702cf8))

### ❤️ Contributors

- Becem Gharbi <becem.gharbi@live.com>

## v0.2.4

[compare changes](https://github.com/esp-admin/app/compare/v0.2.3...v0.2.4)

### 🩹 Fixes

- Set uriTCP to optional on server-side validation ([d11f657](https://github.com/esp-admin/app/commit/d11f657))
- **Report:** Fix undefined model properties ([6dd2ac6](https://github.com/esp-admin/app/commit/6dd2ac6))
- **Settings:** Disable autocomplete on mqtt form ([c5cd7c2](https://github.com/esp-admin/app/commit/c5cd7c2))
- **useDevice:** On update check if exists before calling fetch request ([6379376](https://github.com/esp-admin/app/commit/6379376))
- **ui:** Disable autocomplete on device metadata form ([65293cf](https://github.com/esp-admin/app/commit/65293cf))

### 💅 Refactors

- Fix eslint issues ([199bd28](https://github.com/esp-admin/app/commit/199bd28))
- Remove prisma error client side check ([7ca1468](https://github.com/esp-admin/app/commit/7ca1468))
- Effect changes related to mqtt pkg v5 migration ([ad1db3d](https://github.com/esp-admin/app/commit/ad1db3d))

### 📦 Build

- Add docker-compose setup ([dd376f6](https://github.com/esp-admin/app/commit/dd376f6))
- **docker-compose:** Remove db replicas ([81c7dd8](https://github.com/esp-admin/app/commit/81c7dd8))
- **docker-compose:** Move it to docker repo ([3fb0f63](https://github.com/esp-admin/app/commit/3fb0f63))

### 🏡 Chore

- Fix lint issues ([6dcaa56](https://github.com/esp-admin/app/commit/6dcaa56))
- Run linter on release ([a90f597](https://github.com/esp-admin/app/commit/a90f597))

### ❤️ Contributors

- Becem Gharbi <becem.gharbi@live.com>

## v0.2.3

[compare changes](https://github.com/esp-admin/app/compare/v0.2.2...v0.2.3)

### 🩹 Fixes

- Manually set cors origin config option ([e5be18f](https://github.com/esp-admin/app/commit/e5be18f))

### 💅 Refactors

- Use env matching to replace runtime config ([d8d8586](https://github.com/esp-admin/app/commit/d8d8586))
- Rename LazyNDropdown to LazyDropdown ([995c5a4](https://github.com/esp-admin/app/commit/995c5a4))

### 📦 Build

- Add Dockerfile ([0b0eba8](https://github.com/esp-admin/app/commit/0b0eba8))

### 🏡 Chore

- Upgrade nuxt-auth ([ab5cdd1](https://github.com/esp-admin/app/commit/ab5cdd1))
- Update package.json ([79a0133](https://github.com/esp-admin/app/commit/79a0133))
- Bump `global-parent` to 5.1.2 ([78dfa5b](https://github.com/esp-admin/app/commit/78dfa5b))
- Update example.env ([4708505](https://github.com/esp-admin/app/commit/4708505))
- Add missing robots.txt ([1ac3333](https://github.com/esp-admin/app/commit/1ac3333))
- **pwa:** Set background_color to white ([64a5f54](https://github.com/esp-admin/app/commit/64a5f54))
- **pwa:** Set background color of images to white ([17f9e78](https://github.com/esp-admin/app/commit/17f9e78))
- **pwa:** Add netlify config file ([3e9e878](https://github.com/esp-admin/app/commit/3e9e878))
- Delete netlify.toml ([c9eb344](https://github.com/esp-admin/app/commit/c9eb344))
- Update example.env ([b8b5456](https://github.com/esp-admin/app/commit/b8b5456))

### ❤️ Contributors

- Becem Gharbi <becem.gharbi@live.com>
- Becem <becem.gharbi@live.com>

## v0.2.2

[compare changes](https://github.com/esp-admin/app/compare/v0.2.1...v0.2.2)

### 🔥 Performance

- **default layout:** Lazy load Navbar and Footer ([a3d8274](https://github.com/esp-admin/app/commit/a3d8274))
- **Navbar:** Lazy load dropdown ([7c4d640](https://github.com/esp-admin/app/commit/7c4d640))

### 🩹 Fixes

- Fix file upload (related to nitro) ([0e34584](https://github.com/esp-admin/app/commit/0e34584))
- Fix encoding on netlify ([e688b39](https://github.com/esp-admin/app/commit/e688b39))

### 💅 Refactors

- Effect latest naive-ui changes ([e11c239](https://github.com/esp-admin/app/commit/e11c239))
- Change Notification styles ([1602807](https://github.com/esp-admin/app/commit/1602807))

### 🏡 Chore

- Upgrade dependencies ([9b97ff2](https://github.com/esp-admin/app/commit/9b97ff2))
- Update repository link ([cb7faef](https://github.com/esp-admin/app/commit/cb7faef))
- Change logo ([217bddd](https://github.com/esp-admin/app/commit/217bddd))
- Add lockfile to gitignore ([bb8505c](https://github.com/esp-admin/app/commit/bb8505c))
- Upgrade dependencies ([688131a](https://github.com/esp-admin/app/commit/688131a))
- Disable type restriction on file upload ([92c6464](https://github.com/esp-admin/app/commit/92c6464))
- Enable type check on file upload ([89352f2](https://github.com/esp-admin/app/commit/89352f2))

### ❤️ Contributors

- Becem Gharbi <becem.gharbi@live.com>

## v0.2.1

[compare changes](https://github.com/becem-gharbi/esp-admin/compare/v0.1.5...v0.2.1)

### 🩹 Fixes

- Set colorMode to light on callback page ([feaa27b](https://github.com/becem-gharbi/esp-admin/commit/feaa27b))
- Add missing workbox assets ([1ede20f](https://github.com/becem-gharbi/esp-admin/commit/1ede20f))

### 🏡 Chore

- Set isr rule on get object route ([aa51234](https://github.com/becem-gharbi/esp-admin/commit/aa51234))
- Upgrade nuxt to v3.7 ([e4465db](https://github.com/becem-gharbi/esp-admin/commit/e4465db))
- Upgrade dependencies ([d96a8ee](https://github.com/becem-gharbi/esp-admin/commit/d96a8ee))
- Effect server-side migration to nuxt-auth v2 ([3c9840a](https://github.com/becem-gharbi/esp-admin/commit/3c9840a))
- Effect client-side migration to nuxt-auth v2 ([a6befbc](https://github.com/becem-gharbi/esp-admin/commit/a6befbc))
- Remove admin management ([9fb0419](https://github.com/becem-gharbi/esp-admin/commit/9fb0419))
- Bump version to 0.2 ([b766796](https://github.com/becem-gharbi/esp-admin/commit/b766796))

### ❤️ Contributors

- Becem Gharbi <becem.gharbi@live.com>

## v0.1.5

[compare changes](https://github.com/becem-gharbi/esp-admin/compare/v0.1.4...v0.1.5)

### 🩹 Fixes

- Update release remove handling ([e80b63e](https://github.com/becem-gharbi/esp-admin/commit/e80b63e))

### 💅 Refactors

- Set object-fit to cover on avatar upload ([ab7164d](https://github.com/becem-gharbi/esp-admin/commit/ab7164d))

### 🏡 Chore

- Upgrade dependencies ([f5a5d10](https://github.com/becem-gharbi/esp-admin/commit/f5a5d10))
- Upgrade dependencies ([7d3b229](https://github.com/becem-gharbi/esp-admin/commit/7d3b229))
- Upgrade dependencies ([47230f9](https://github.com/becem-gharbi/esp-admin/commit/47230f9))

### ❤️ Contributors

- Becem Gharbi <becem.gharbi@live.com>

## v0.1.4

[compare changes](https://github.com/becem-gharbi/esp-admin/compare/v0.1.3...v0.1.4)

### 🏡 Chore

- Enable Admin API ([f89af30](https://github.com/becem-gharbi/esp-admin/commit/f89af30))
- Upgrade dependencies ([51bb52f](https://github.com/becem-gharbi/esp-admin/commit/51bb52f))
- Remove nuxt devtools ([3eee70c](https://github.com/becem-gharbi/esp-admin/commit/3eee70c))
- Migrate from @bg-dev/nuxt-s3 to nuxt-s3 ([96e452c](https://github.com/becem-gharbi/esp-admin/commit/96e452c))

### ❤️ Contributors

- Becem Gharbi <becem.gharbi@live.com>

## v0.1.3

[compare changes](https://github.com/becem-gharbi/esp-admin/compare/v0.1.2...v0.1.3)

### 🔥 Performance

- Add S3 object caching ([c2622d3](https://github.com/becem-gharbi/esp-admin/commit/c2622d3))

### 🩹 Fixes

- Set user avatar object-fit to cover ([674d5c1](https://github.com/becem-gharbi/esp-admin/commit/674d5c1))
- Show password on click instead on on mousedown ([56e5381](https://github.com/becem-gharbi/esp-admin/commit/56e5381))

### 💅 Refactors

- Replace S3Image with native img ([d6e33ab](https://github.com/becem-gharbi/esp-admin/commit/d6e33ab))

### 📖 Documentation

- Update README.md ([5955213](https://github.com/becem-gharbi/esp-admin/commit/5955213))

### 🏡 Chore

- Update s3 object cache-control ([a2bf31b](https://github.com/becem-gharbi/esp-admin/commit/a2bf31b))
- Update baseURL ([224c2b8](https://github.com/becem-gharbi/esp-admin/commit/224c2b8))
- Upgrade dependencies ([9c950cb](https://github.com/becem-gharbi/esp-admin/commit/9c950cb))
- Upgrade dependencies ([03dd44b](https://github.com/becem-gharbi/esp-admin/commit/03dd44b))
- Upgrade dependencies ([496b1a2](https://github.com/becem-gharbi/esp-admin/commit/496b1a2))

### ❤️ Contributors

- Becem Gharbi <becem.gharbi@live.com>
- Becem <becem.gharbi@live.com>

## v0.1.2

[compare changes](https://github.com/becem-gharbi/esp-admin/compare/v0.1.1...v0.1.2)

### 🩹 Fixes

- Update mqtt connected state on disconnect events ([56b53bd](https://github.com/becem-gharbi/esp-admin/commit/56b53bd))

### 📖 Documentation

- Update README.md ([cbeed29](https://github.com/becem-gharbi/esp-admin/commit/cbeed29))

### 🏡 Chore

- Set stage to Beta ([bead60c](https://github.com/becem-gharbi/esp-admin/commit/bead60c))
- Use relative url for static assets ([e2977e5](https://github.com/becem-gharbi/esp-admin/commit/e2977e5))
- Add vite-pwa ([d30f3b4](https://github.com/becem-gharbi/esp-admin/commit/d30f3b4))
- Upgrade dependencies ([e97e683](https://github.com/becem-gharbi/esp-admin/commit/e97e683))
- Upgrade dependencies ([ed46b95](https://github.com/becem-gharbi/esp-admin/commit/ed46b95))

### ❤️ Contributors

- Becem Gharbi <becem.gharbi@live.com>
- Becem <becem.gharbi@live.com>

## v0.1.1

[compare changes](https://github.com/becem-gharbi/esp-admin/compare/v0.0.11...v0.1.1)

### 🚀 Enhancements

- Add deployment remove ([be9178d](https://github.com/becem-gharbi/esp-admin/commit/be9178d))
- Create custom report email template ([4cde7e9](https://github.com/becem-gharbi/esp-admin/commit/4cde7e9))
- Add missing server-side input validation ([e4cad3d](https://github.com/becem-gharbi/esp-admin/commit/e4cad3d))

### 🩹 Fixes

- Remove non project variables from device variables ([8ac86a6](https://github.com/becem-gharbi/esp-admin/commit/8ac86a6))
- Fix item index check ([8783cc1](https://github.com/becem-gharbi/esp-admin/commit/8783cc1))

### 💅 Refactors

- Move report utils to useReport ([a386d6d](https://github.com/becem-gharbi/esp-admin/commit/a386d6d))
- Remove input search debounce ([77d2378](https://github.com/becem-gharbi/esp-admin/commit/77d2378))
- Increase width of modals ([44780c7](https://github.com/becem-gharbi/esp-admin/commit/44780c7))
- Increase user avatar size ([2d5412b](https://github.com/becem-gharbi/esp-admin/commit/2d5412b))
- Rename command debug to log ([4220096](https://github.com/becem-gharbi/esp-admin/commit/4220096))
- Reduce auth form width ([2ac31c9](https://github.com/becem-gharbi/esp-admin/commit/2ac31c9))
- On delete form add confirm input ([3ce4679](https://github.com/becem-gharbi/esp-admin/commit/3ce4679))
- **models:** Rename downloadUrl to downloadPath in Release ([0cd98a4](https://github.com/becem-gharbi/esp-admin/commit/0cd98a4))
- Rename downloadUrl to downloadPath ([03ba3e0](https://github.com/becem-gharbi/esp-admin/commit/03ba3e0))
- Change homepage path to / ([5f58247](https://github.com/becem-gharbi/esp-admin/commit/5f58247))

### 📖 Documentation

- **readme:** Remove under development warning ([9ff5d8a](https://github.com/becem-gharbi/esp-admin/commit/9ff5d8a))

### 🏡 Chore

- Update favicon ([00ece02](https://github.com/becem-gharbi/esp-admin/commit/00ece02))
- Add poster.png ([a645755](https://github.com/becem-gharbi/esp-admin/commit/a645755))
- **desing:** Add backend design rev-5 ([0d06f66](https://github.com/becem-gharbi/esp-admin/commit/0d06f66))
- Bump version to 0.1 ([7a07fc1](https://github.com/becem-gharbi/esp-admin/commit/7a07fc1))

### ❤️ Contributors

- Becem Gharbi ([@becem-gharbi](http://github.com/becem-gharbi))

## v0.0.11

[compare changes](https://github.com/becem-gharbi/esp-admin/compare/v0.0.10...v0.0.11)

### 🚀 Enhancements

- Use private S3 bucket ([7f55c66](https://github.com/becem-gharbi/esp-admin/commit/7f55c66))

### 💅 Refactors

- Customize email templates ([04da2d3](https://github.com/becem-gharbi/esp-admin/commit/04da2d3))
- Display description on Device & Project cards ([9f57f45](https://github.com/becem-gharbi/esp-admin/commit/9f57f45))
- Set mqtt settings password input's type ([59af5a7](https://github.com/becem-gharbi/esp-admin/commit/59af5a7))
- Add titles to modals ([fcab238](https://github.com/becem-gharbi/esp-admin/commit/fcab238))

### 🏡 Chore

- Upgrade dependencies ([bfb6599](https://github.com/becem-gharbi/esp-admin/commit/bfb6599))
- Add new env, check example.env ([bbc3de9](https://github.com/becem-gharbi/esp-admin/commit/bbc3de9))
- Upgrade dependencies ([027909b](https://github.com/becem-gharbi/esp-admin/commit/027909b))
- Set SEO meta ([31d4356](https://github.com/becem-gharbi/esp-admin/commit/31d4356))
- Update SEO meta ([d897373](https://github.com/becem-gharbi/esp-admin/commit/d897373))

### ❤️ Contributors

- Becem Gharbi ([@becem-gharbi](http://github.com/becem-gharbi))

## v0.0.10

[compare changes](https://github.com/becem-gharbi/esp-admin/compare/v0.0.9...v0.0.10)

### 🚀 Enhancements

- Add Github login method ([43e5e9b](https://github.com/becem-gharbi/esp-admin/commit/43e5e9b))

### 🩹 Fixes

- Add missing client side email validations ([f8945de](https://github.com/becem-gharbi/esp-admin/commit/f8945de))

### 💅 Refactors

- **models:** Update Report ([b2de303](https://github.com/becem-gharbi/esp-admin/commit/b2de303))
- Update report settings form ([91b3f05](https://github.com/becem-gharbi/esp-admin/commit/91b3f05))
- Update report custom handler ([6488248](https://github.com/becem-gharbi/esp-admin/commit/6488248))
- Add handleCustom report handler ([16ec016](https://github.com/becem-gharbi/esp-admin/commit/16ec016))
- Update auth layout ([89c532e](https://github.com/becem-gharbi/esp-admin/commit/89c532e))
- Add home btn to Footer ([65c7834](https://github.com/becem-gharbi/esp-admin/commit/65c7834))
- Rename NavbarMain to Navbar ([d26aad4](https://github.com/becem-gharbi/esp-admin/commit/d26aad4))
- Minor UI refactoring ([8c210a2](https://github.com/becem-gharbi/esp-admin/commit/8c210a2))

### 📖 Documentation

- **readme:** Replace Bugsnag report method with Email ([9805856](https://github.com/becem-gharbi/esp-admin/commit/9805856))
- Update README.md ([4d45c26](https://github.com/becem-gharbi/esp-admin/commit/4d45c26))

### 🏡 Chore

- Remove landing page & redirect to login page ([e62f69b](https://github.com/becem-gharbi/esp-admin/commit/e62f69b))
- Remove google analytics ([63ea8fb](https://github.com/becem-gharbi/esp-admin/commit/63ea8fb))

### ❤️ Contributors

- Becem Gharbi ([@becem-gharbi](http://github.com/becem-gharbi))
- Becem ([@becem-gharbi](http://github.com/becem-gharbi))

## v0.0.9

[compare changes](https://github.com/becem-gharbi/esp-admin/compare/v0.0.8...v0.0.9)

### 🚀 Enhancements

- Add custom report via email ([843c8de](https://github.com/becem-gharbi/esp-admin/commit/843c8de))
- Replace pkg paho-mqtt with mqtt for mqtt v5 support ([7ce3ac4](https://github.com/becem-gharbi/esp-admin/commit/7ce3ac4))

### 🩹 Fixes

- Disable inlineSSRStyles for fixing tailwind styles conflict ([f4a980d](https://github.com/becem-gharbi/esp-admin/commit/f4a980d))
- Fix S3 middleware ([7a16fea](https://github.com/becem-gharbi/esp-admin/commit/7a16fea))
- Fix undefined userId in user patch handler ([83f68a2](https://github.com/becem-gharbi/esp-admin/commit/83f68a2))
- **DeploymentStatus:** Replace ctive with started ([2e54126](https://github.com/becem-gharbi/esp-admin/commit/2e54126))
- Fix <update> report message parsing ([4c5229d](https://github.com/becem-gharbi/esp-admin/commit/4c5229d))
- Auto scroll on realtime logs ([bc5077b](https://github.com/becem-gharbi/esp-admin/commit/bc5077b))
- Fix composables naming ([174d1a0](https://github.com/becem-gharbi/esp-admin/commit/174d1a0))
- About create release on upload fail ([a09a59e](https://github.com/becem-gharbi/esp-admin/commit/a09a59e))
- Allow profile update on unedited form ([403a491](https://github.com/becem-gharbi/esp-admin/commit/403a491))
- Reconnect on lost mqtt connection ([a12431e](https://github.com/becem-gharbi/esp-admin/commit/a12431e))

### 💅 Refactors

- Add route validation on device & project pages ([c65f959](https://github.com/becem-gharbi/esp-admin/commit/c65f959))
- Add missing autocomplete form attribute ([561b973](https://github.com/becem-gharbi/esp-admin/commit/561b973))
- Replace projectId with releaseId in update command ([ee1e65f](https://github.com/becem-gharbi/esp-admin/commit/ee1e65f))
- Replace Authorization with API-KEY in checkDevice ([c9fd9d9](https://github.com/becem-gharbi/esp-admin/commit/c9fd9d9))
- Refactor device related api handlers ([a789b91](https://github.com/becem-gharbi/esp-admin/commit/a789b91))
- **models:** Remove mac field from Device & replace active with started in DeploymentStatus ([070151d](https://github.com/becem-gharbi/esp-admin/commit/070151d))
- Remove mac input on device create ([7e3fd3f](https://github.com/becem-gharbi/esp-admin/commit/7e3fd3f))
- **models:** Remove certificate field from Mqtt ([f95eb61](https://github.com/becem-gharbi/esp-admin/commit/f95eb61))
- Remove certificate input on mqtt settings ([f8d18aa](https://github.com/becem-gharbi/esp-admin/commit/f8d18aa))
- **update:** Return only deployment id on update endpoint ([07a88ef](https://github.com/becem-gharbi/esp-admin/commit/07a88ef))
- Select only required fields on device handlers ([407edd0](https://github.com/becem-gharbi/esp-admin/commit/407edd0))
- Merge update patch handler with update post handler ([27fb3a4](https://github.com/becem-gharbi/esp-admin/commit/27fb3a4))
- Change deployment started icon ([f321ad7](https://github.com/becem-gharbi/esp-admin/commit/f321ad7))
- Order findMany by desc createdAt ([96dc195](https://github.com/becem-gharbi/esp-admin/commit/96dc195))
- Minor ui refactoring ([0e3f77f](https://github.com/becem-gharbi/esp-admin/commit/0e3f77f))
- Display device id on metadata form ([9627d2b](https://github.com/becem-gharbi/esp-admin/commit/9627d2b))
- Minor ui refactoring ([189f7b8](https://github.com/becem-gharbi/esp-admin/commit/189f7b8))
- Cache projects with useState ([693aa99](https://github.com/becem-gharbi/esp-admin/commit/693aa99))
- Cache devices with useState ([dd9cb54](https://github.com/becem-gharbi/esp-admin/commit/dd9cb54))
- Cache release with useState ([8c174af](https://github.com/becem-gharbi/esp-admin/commit/8c174af))
- Cache deployments with useState ([695a3e4](https://github.com/becem-gharbi/esp-admin/commit/695a3e4))
- Cache mqtt with useState ([73c2e2b](https://github.com/becem-gharbi/esp-admin/commit/73c2e2b))
- Cache report settings with useState ([8e069ed](https://github.com/becem-gharbi/esp-admin/commit/8e069ed))
- Create layout public ([2999465](https://github.com/becem-gharbi/esp-admin/commit/2999465))
- Minor ui refactoring ([3e1a3c3](https://github.com/becem-gharbi/esp-admin/commit/3e1a3c3))
- Add layout and page transitions ([07d9770](https://github.com/becem-gharbi/esp-admin/commit/07d9770))

### 📖 Documentation

- **readme:** Remove leading slash on topics ([7312b9f](https://github.com/becem-gharbi/esp-admin/commit/7312b9f))
- Update README ([8384522](https://github.com/becem-gharbi/esp-admin/commit/8384522))
- **readme:** Remove nvs encryption note ([dd037ed](https://github.com/becem-gharbi/esp-admin/commit/dd037ed))
- Update README ([5f44725](https://github.com/becem-gharbi/esp-admin/commit/5f44725))

### 🌊 Types

- Add mqtt/dist/mqtt declaration file ([51c6ee4](https://github.com/becem-gharbi/esp-admin/commit/51c6ee4))

### 🏡 Chore

- Downgrade nuxt to v3.5 ([9808c1b](https://github.com/becem-gharbi/esp-admin/commit/9808c1b))
- Replace destr with JSON.parse ([3474122](https://github.com/becem-gharbi/esp-admin/commit/3474122))
- Change fontFamily to Rubik ([47ac2ef](https://github.com/becem-gharbi/esp-admin/commit/47ac2ef))
- Enable google analytics ([be41244](https://github.com/becem-gharbi/esp-admin/commit/be41244))
- Upgrade to nuxt v3.6 ([5235b3d](https://github.com/becem-gharbi/esp-admin/commit/5235b3d))

### ❤️ Contributors

- Becem Gharbi ([@becem-gharbi](http://github.com/becem-gharbi))

## v0.0.8

[compare changes](https://github.com/becem-gharbi/esp-admin/compare/v0.0.7...v0.0.8)

### 🚀 Enhancements

- Implement deployment state management ([dac581a](https://github.com/becem-gharbi/esp-admin/commit/dac581a))
- Implemenent deployment update ([62af379](https://github.com/becem-gharbi/esp-admin/commit/62af379))
- Add basic dashboard ([f019907](https://github.com/becem-gharbi/esp-admin/commit/f019907))
- Add device [GET] settings ([0c981ba](https://github.com/becem-gharbi/esp-admin/commit/0c981ba))

### 🩹 Fixes

- Set initial values on form reset ([8ead75d](https://github.com/becem-gharbi/esp-admin/commit/8ead75d))
- Fix check for whitespaces Regex ([0bfab7a](https://github.com/becem-gharbi/esp-admin/commit/0bfab7a))

### 💅 Refactors

- Set dynamic input width to full ([1154640](https://github.com/becem-gharbi/esp-admin/commit/1154640))
- Use built-in naive form reset ([b316ce3](https://github.com/becem-gharbi/esp-admin/commit/b316ce3))
- Disable submit btn on unedited form ([7dace61](https://github.com/becem-gharbi/esp-admin/commit/7dace61))
- Remove findLinked method ([021b846](https://github.com/becem-gharbi/esp-admin/commit/021b846))
- Create checkDevice for device authorization ([6477e59](https://github.com/becem-gharbi/esp-admin/commit/6477e59))
- Add checkUser for user authorization ([a72c6aa](https://github.com/becem-gharbi/esp-admin/commit/a72c6aa))
- Minor UI refactoring ([439d452](https://github.com/becem-gharbi/esp-admin/commit/439d452))

### 📖 Documentation

- Add sdk link to readme ([7c16e32](https://github.com/becem-gharbi/esp-admin/commit/7c16e32))

### 🌊 Types

- Downgrade Highcharts to v10 for typed options ([66d3d3c](https://github.com/becem-gharbi/esp-admin/commit/66d3d3c))

### ❤️ Contributors

- Becem Gharbi ([@becem-gharbi](http://github.com/becem-gharbi))

## v0.0.7

[compare changes](https://github.com/becem-gharbi/esp-admin/compare/v0.0.6...v0.0.7)

### 🚀 Enhancements

- Add mqtt client connection with reactive state ([ff2b509](https://github.com/becem-gharbi/esp-admin/commit/ff2b509))
- Add MQTT status notification ([379341b](https://github.com/becem-gharbi/esp-admin/commit/379341b))
- Add mqtt on message receive handler ([6ad6b9f](https://github.com/becem-gharbi/esp-admin/commit/6ad6b9f))
- Implement status handler ([ef0988f](https://github.com/becem-gharbi/esp-admin/commit/ef0988f))
- Implement logs handler ([4630d0e](https://github.com/becem-gharbi/esp-admin/commit/4630d0e))
- Implement realtime logs highlighting ([8c2abab](https://github.com/becem-gharbi/esp-admin/commit/8c2abab))
- Implement debug enable/disable ([865a96d](https://github.com/becem-gharbi/esp-admin/commit/865a96d))
- Implement sending custom commands ([7f70afb](https://github.com/becem-gharbi/esp-admin/commit/7f70afb))
- Add sending restart ([852ac8d](https://github.com/becem-gharbi/esp-admin/commit/852ac8d))
- Implement sending variables ([b055271](https://github.com/becem-gharbi/esp-admin/commit/b055271))
- Implement sending releases ([b932287](https://github.com/becem-gharbi/esp-admin/commit/b932287))
- Implement sending release trigger ([e2f6c77](https://github.com/becem-gharbi/esp-admin/commit/e2f6c77))

### 🩹 Fixes

- Use default import for paho-mqtt ([d02a5e0](https://github.com/becem-gharbi/esp-admin/commit/d02a5e0))
- Initialize variables update form ([69e49c6](https://github.com/becem-gharbi/esp-admin/commit/69e49c6))

### 💅 Refactors

- **ui:** Reduce heights ([4c43cf7](https://github.com/becem-gharbi/esp-admin/commit/4c43cf7))
- **ui:** Disable responsive root fontSize ([379ea96](https://github.com/becem-gharbi/esp-admin/commit/379ea96))
- Call mqtt connect on user logged in hook ([bd249ef](https://github.com/becem-gharbi/esp-admin/commit/bd249ef))
- Diallow mqtt settings update on invalid connection ([90110ce](https://github.com/becem-gharbi/esp-admin/commit/90110ce))
- Add input validation on setting commands ([54060ae](https://github.com/becem-gharbi/esp-admin/commit/54060ae))
- Refactor regex validations ([a8812ef](https://github.com/becem-gharbi/esp-admin/commit/a8812ef))
- Reduce DeviceStatus size ([dcd8075](https://github.com/becem-gharbi/esp-admin/commit/dcd8075))

### 📖 Documentation

- Update README.md ([c8f622b](https://github.com/becem-gharbi/esp-admin/commit/c8f622b))

### 🏡 Chore

- Upgrade dependencies ([2f9c16e](https://github.com/becem-gharbi/esp-admin/commit/2f9c16e))

### ❤️ Contributors

- Becem Gharbi ([@becem-gharbi](http://github.com/becem-gharbi))
- Becem ([@becem-gharbi](http://github.com/becem-gharbi))

## v0.0.6

[compare changes](https://github.com/becem-gharbi/esp-admin/compare/v0.0.5...v0.0.6)

### 🩹 Fixes

- **models:** Set project & device names unique per user ([7ecf928](https://github.com/becem-gharbi/esp-admin/commit/7ecf928))

### 💅 Refactors

- Set root fontSize to 16px on 768px ([1045a76](https://github.com/becem-gharbi/esp-admin/commit/1045a76))
- Apply minor UI refactoring ([c54ea34](https://github.com/becem-gharbi/esp-admin/commit/c54ea34))
- **ui:** Increase heights ([5465997](https://github.com/becem-gharbi/esp-admin/commit/5465997))
- Remve trigger btn in deployment card ([a52a0a0](https://github.com/becem-gharbi/esp-admin/commit/a52a0a0))
- Aplly minor UI changes ([dae46df](https://github.com/becem-gharbi/esp-admin/commit/dae46df))

### 📖 Documentation

- **readme:** Add Flows section ([c3a1877](https://github.com/becem-gharbi/esp-admin/commit/c3a1877))

### 🏡 Chore

- **design:** Add ui design rev-5 ([7b39cb1](https://github.com/becem-gharbi/esp-admin/commit/7b39cb1))

### ❤️ Contributors

- Becem Gharbi ([@becem-gharbi](http://github.com/becem-gharbi))

## v0.0.5

[compare changes](https://github.com/becem-gharbi/esp-admin/compare/v0.0.4...v0.0.5)

### 🚀 Enhancements

- Add Footer ([077c633](https://github.com/becem-gharbi/esp-admin/commit/077c633))

### 🩹 Fixes

- Fix layouts conflict ([0b7f811](https://github.com/becem-gharbi/esp-admin/commit/0b7f811))
- Add missing SEO tags ([61ee112](https://github.com/becem-gharbi/esp-admin/commit/61ee112))
- Disallow project remove having linked devices ([78eb6ab](https://github.com/becem-gharbi/esp-admin/commit/78eb6ab))
- Specify extension in firmware upload ([5d71a82](https://github.com/becem-gharbi/esp-admin/commit/5d71a82))
- Add missing client side regex validations ([ddd801f](https://github.com/becem-gharbi/esp-admin/commit/ddd801f))
- Check if names starts or ends with spaces ([6f62496](https://github.com/becem-gharbi/esp-admin/commit/6f62496))
- Fix tailwind fontSize get ([2210180](https://github.com/becem-gharbi/esp-admin/commit/2210180))

### 💅 Refactors

- Disable default layout on landing page ([296d89a](https://github.com/becem-gharbi/esp-admin/commit/296d89a))
- Use naive n-time for date display ([109a489](https://github.com/becem-gharbi/esp-admin/commit/109a489))
- Display Footer on landing page ([a71c70c](https://github.com/becem-gharbi/esp-admin/commit/a71c70c))
- Change font family to Inter ([ddd7051](https://github.com/becem-gharbi/esp-admin/commit/ddd7051))
- Update naive colors ([2bc6d35](https://github.com/becem-gharbi/esp-admin/commit/2bc6d35))
- Replace view btn with card click ([cda33a5](https://github.com/becem-gharbi/esp-admin/commit/cda33a5))
- Use responsive instead of fixed heights ([7dfed55](https://github.com/becem-gharbi/esp-admin/commit/7dfed55))
- Remove card on auth forms ([16f4da4](https://github.com/becem-gharbi/esp-admin/commit/16f4da4))
- Implement minor UI changes ([ef36bc8](https://github.com/becem-gharbi/esp-admin/commit/ef36bc8))
- Apply minor UI refactoring ([3c8b8a9](https://github.com/becem-gharbi/esp-admin/commit/3c8b8a9))
- Aplly minor UI refactoring ([e551df2](https://github.com/becem-gharbi/esp-admin/commit/e551df2))
- Apply minor UI refactoring ([8b47b32](https://github.com/becem-gharbi/esp-admin/commit/8b47b32))
- Add logos light & dark ([35ac3fb](https://github.com/becem-gharbi/esp-admin/commit/35ac3fb))
- Add empty projects & devices & releases UI ([24f1955](https://github.com/becem-gharbi/esp-admin/commit/24f1955))
- Set modal size to default ([7c105b3](https://github.com/becem-gharbi/esp-admin/commit/7c105b3))
- Change footer height to 48px ([0179aca](https://github.com/becem-gharbi/esp-admin/commit/0179aca))

### 🏡 Chore

- **design:** Add backend design rev-4 ([9bf2ff7](https://github.com/becem-gharbi/esp-admin/commit/9bf2ff7))
- Configure Renovate ([9f07506](https://github.com/becem-gharbi/esp-admin/commit/9f07506))
- Move logos to assets directory ([eb29b0b](https://github.com/becem-gharbi/esp-admin/commit/eb29b0b))

### ❤️ Contributors

- Becem Gharbi ([@becem-gharbi](http://github.com/becem-gharbi))
- Becem ([@becem-gharbi](http://github.com/becem-gharbi))

## v0.0.4

[compare changes](https://github.com/becem-gharbi/esp-admin/compare/v0.0.2...v0.0.4)

### 🚀 Enhancements

- Implement project metadata & variables & commands ([3a1ffeb](https://github.com/becem-gharbi/esp-admin/commit/3a1ffeb))
- Implement device metadata & variables & commands ([860f389](https://github.com/becem-gharbi/esp-admin/commit/860f389))
- Implement Release state management ([b330fbc](https://github.com/becem-gharbi/esp-admin/commit/b330fbc))
- Implement firmware upload ([aed98cb](https://github.com/becem-gharbi/esp-admin/commit/aed98cb))
- Implement firmware delete ([c96d41c](https://github.com/becem-gharbi/esp-admin/commit/c96d41c))
- Implement mqtt & report state management ([eb78886](https://github.com/becem-gharbi/esp-admin/commit/eb78886))
- Implement mqtt settings update ([e36e3a8](https://github.com/becem-gharbi/esp-admin/commit/e36e3a8))
- Implement report settings update ([4cb2fbe](https://github.com/becem-gharbi/esp-admin/commit/4cb2fbe))

### 🔥 Performance

- Select only needed fields on findMany ([2d563fb](https://github.com/becem-gharbi/esp-admin/commit/2d563fb))

### 🩹 Fixes

- **models:** Change variables type to Json in Device ([1168306](https://github.com/becem-gharbi/esp-admin/commit/1168306))
- Unlink devices on project delete ([80502b2](https://github.com/becem-gharbi/esp-admin/commit/80502b2))
- Fix input search by name ([087a941](https://github.com/becem-gharbi/esp-admin/commit/087a941))
- **models:** Update MQTT schema ([ded5722](https://github.com/becem-gharbi/esp-admin/commit/ded5722))
- **models:** Rename bagsnagKey to bugsnagKey in Report ([2221b5f](https://github.com/becem-gharbi/esp-admin/commit/2221b5f))

### 💅 Refactors

- Move device unlink to device page ([0b22737](https://github.com/becem-gharbi/esp-admin/commit/0b22737))
- Display error message on delete project having release(s) ([5711333](https://github.com/becem-gharbi/esp-admin/commit/5711333))
- Update s3 permissions ([e7672fd](https://github.com/becem-gharbi/esp-admin/commit/e7672fd))
- Set form feedback padding to 8px ([8e2e53e](https://github.com/becem-gharbi/esp-admin/commit/8e2e53e))

### 🌊 Types

- Expose prisma types globally ([b7350b2](https://github.com/becem-gharbi/esp-admin/commit/b7350b2))

### 🏡 Chore

- Add example.env ([eb36048](https://github.com/becem-gharbi/esp-admin/commit/eb36048))
- Enable ssr ([30c95a5](https://github.com/becem-gharbi/esp-admin/commit/30c95a5))
- Disable GTAG in development ([d6ab785](https://github.com/becem-gharbi/esp-admin/commit/d6ab785))
- Enable SSR ([10594c1](https://github.com/becem-gharbi/esp-admin/commit/10594c1))
- Enable ssr only in production ([b93760d](https://github.com/becem-gharbi/esp-admin/commit/b93760d))
- **release:** V0.0.3 ([ee60667](https://github.com/becem-gharbi/esp-admin/commit/ee60667))

### ❤️ Contributors

- Becem Gharbi ([@becem-gharbi](http://github.com/becem-gharbi))

## v0.0.3

[compare changes](https://github.com/becem-gharbi/esp-admin/compare/v0.0.2...v0.0.3)

### 🚀 Enhancements

- Implement project metadata & variables & commands ([3a1ffeb](https://github.com/becem-gharbi/esp-admin/commit/3a1ffeb))
- Implement device metadata & variables & commands ([860f389](https://github.com/becem-gharbi/esp-admin/commit/860f389))
- Implement Release state management ([b330fbc](https://github.com/becem-gharbi/esp-admin/commit/b330fbc))
- Implement firmware upload ([aed98cb](https://github.com/becem-gharbi/esp-admin/commit/aed98cb))
- Implement firmware delete ([c96d41c](https://github.com/becem-gharbi/esp-admin/commit/c96d41c))
- Implement mqtt & report state management ([eb78886](https://github.com/becem-gharbi/esp-admin/commit/eb78886))
- Implement mqtt settings update ([e36e3a8](https://github.com/becem-gharbi/esp-admin/commit/e36e3a8))
- Implement report settings update ([4cb2fbe](https://github.com/becem-gharbi/esp-admin/commit/4cb2fbe))

### 🔥 Performance

- Select only needed fields on findMany ([2d563fb](https://github.com/becem-gharbi/esp-admin/commit/2d563fb))

### 🩹 Fixes

- **models:** Change variables type to Json in Device ([1168306](https://github.com/becem-gharbi/esp-admin/commit/1168306))
- Unlink devices on project delete ([80502b2](https://github.com/becem-gharbi/esp-admin/commit/80502b2))
- Fix input search by name ([087a941](https://github.com/becem-gharbi/esp-admin/commit/087a941))
- **models:** Update MQTT schema ([ded5722](https://github.com/becem-gharbi/esp-admin/commit/ded5722))
- **models:** Rename bagsnagKey to bugsnagKey in Report ([2221b5f](https://github.com/becem-gharbi/esp-admin/commit/2221b5f))

### 💅 Refactors

- Move device unlink to device page ([0b22737](https://github.com/becem-gharbi/esp-admin/commit/0b22737))
- Display error message on delete project having release(s) ([5711333](https://github.com/becem-gharbi/esp-admin/commit/5711333))
- Update s3 permissions ([e7672fd](https://github.com/becem-gharbi/esp-admin/commit/e7672fd))
- Set form feedback padding to 8px ([8e2e53e](https://github.com/becem-gharbi/esp-admin/commit/8e2e53e))

### 🌊 Types

- Expose prisma types globally ([b7350b2](https://github.com/becem-gharbi/esp-admin/commit/b7350b2))

### 🏡 Chore

- Add example.env ([eb36048](https://github.com/becem-gharbi/esp-admin/commit/eb36048))
- Enable ssr ([30c95a5](https://github.com/becem-gharbi/esp-admin/commit/30c95a5))
- Disable GTAG in development ([d6ab785](https://github.com/becem-gharbi/esp-admin/commit/d6ab785))
- Enable SSR ([10594c1](https://github.com/becem-gharbi/esp-admin/commit/10594c1))
- Enable ssr only in production ([b93760d](https://github.com/becem-gharbi/esp-admin/commit/b93760d))

### ❤️ Contributors

- Becem Gharbi ([@becem-gharbi](http://github.com/becem-gharbi))

## v0.0.2

[compare changes](https://github.com/becem-gharbi/esp-admin/compare/v0.0.1...v0.0.2)

### 🚀 Enhancements

- **models:** Update prisma schema ([e2b92b6](https://github.com/becem-gharbi/esp-admin/commit/e2b92b6))
- Implement project get & create & delete ([d8473f0](https://github.com/becem-gharbi/esp-admin/commit/d8473f0))
- Implement device get & create & delete ([d85fb96](https://github.com/becem-gharbi/esp-admin/commit/d85fb96))
- Implement device link & unlink ([d79243c](https://github.com/becem-gharbi/esp-admin/commit/d79243c))
- Implement devices & projects search ([ac92a77](https://github.com/becem-gharbi/esp-admin/commit/ac92a77))
- Implement device state management ([00ffe64](https://github.com/becem-gharbi/esp-admin/commit/00ffe64))
- Implement project state management ([dc120c9](https://github.com/becem-gharbi/esp-admin/commit/dc120c9))
- Implement device link & unlink state management ([f128165](https://github.com/becem-gharbi/esp-admin/commit/f128165))

### 🩹 Fixes

- Handle device & project not found ([1d25c07](https://github.com/becem-gharbi/esp-admin/commit/1d25c07))
- Hide dropdown navigation responsivly ([8c7df23](https://github.com/becem-gharbi/esp-admin/commit/8c7df23))

### 💅 Refactors

- Apply changes for consistency ([dd2cdc6](https://github.com/becem-gharbi/esp-admin/commit/dd2cdc6))
- Format builtin components to snakeCase ([698ebac](https://github.com/becem-gharbi/esp-admin/commit/698ebac))
- Move default layout to app.vue ([af89b73](https://github.com/becem-gharbi/esp-admin/commit/af89b73))
- Add home to main navbar ([332c590](https://github.com/becem-gharbi/esp-admin/commit/332c590))

### 🏡 Chore

- **design:** Add backend design rev-3 ([39f5e35](https://github.com/becem-gharbi/esp-admin/commit/39f5e35))
- Set version to 0.0.1 ([aaec598](https://github.com/becem-gharbi/esp-admin/commit/aaec598))

### ❤️ Contributors

- Becem Gharbi ([@becem-gharbi](http://github.com/becem-gharbi))

## v0.0.1

### 🚀 Enhancements

- Add Google Analytics ([dcec67c](https://github.com/becem-gharbi/esp-admin/commit/dcec67c))
- Create basic ui ([506e5aa](https://github.com/becem-gharbi/esp-admin/commit/506e5aa))
- Add basic modals ([1be72cc](https://github.com/becem-gharbi/esp-admin/commit/1be72cc))

### 🩹 Fixes

- **config:** Disable xssValidator on `api/s3/object/create` endpoint ([aa5a05d](https://github.com/becem-gharbi/esp-admin/commit/aa5a05d))

### 💅 Refactors

- Remove Fcm and prepare project ([6132068](https://github.com/becem-gharbi/esp-admin/commit/6132068))
- **layout:** Add homepage and github redirects ([1a1c9c4](https://github.com/becem-gharbi/esp-admin/commit/1a1c9c4))
- Add page transitions ([d9d14d5](https://github.com/becem-gharbi/esp-admin/commit/d9d14d5))
- Auth layout ([b28ad0b](https://github.com/becem-gharbi/esp-admin/commit/b28ad0b))
- Add device status ([e095e56](https://github.com/becem-gharbi/esp-admin/commit/e095e56))
- Settings spacing ([3de93f7](https://github.com/becem-gharbi/esp-admin/commit/3de93f7))
- Add create release modal ([f64bf8f](https://github.com/becem-gharbi/esp-admin/commit/f64bf8f))
- Add cancel btn in modals ([f8e7cec](https://github.com/becem-gharbi/esp-admin/commit/f8e7cec))
- **ui:** Session card ([12ad779](https://github.com/becem-gharbi/esp-admin/commit/12ad779))
- **models:** Remove birthday in User ([1c4ae6e](https://github.com/becem-gharbi/esp-admin/commit/1c4ae6e))

### 📖 Documentation

- **readme:** Add features and global architecture ([c9a41dc](https://github.com/becem-gharbi/esp-admin/commit/c9a41dc))
- Update architecture ([b308c60](https://github.com/becem-gharbi/esp-admin/commit/b308c60))
- **readme:** Update components section ([d45c211](https://github.com/becem-gharbi/esp-admin/commit/d45c211))
- **readme:** Fix typos ([0b7ff09](https://github.com/becem-gharbi/esp-admin/commit/0b7ff09))
- **readme:** Update README ([077730e](https://github.com/becem-gharbi/esp-admin/commit/077730e))
- **readme:** Update README.md ([30d926a](https://github.com/becem-gharbi/esp-admin/commit/30d926a))
- **readme:** Update README.md ([2c38abe](https://github.com/becem-gharbi/esp-admin/commit/2c38abe))

### 🏡 Chore

- **design:** Add ui design rev-0 ([c5c4339](https://github.com/becem-gharbi/esp-admin/commit/c5c4339))
- **design:** Add ui design rev-1 ([9710727](https://github.com/becem-gharbi/esp-admin/commit/9710727))
- **design:** Add ui design rev-2 ([f7dcf8e](https://github.com/becem-gharbi/esp-admin/commit/f7dcf8e))
- **design:** Add ui design rev-3 ([238078e](https://github.com/becem-gharbi/esp-admin/commit/238078e))
- **design:** Add backend design rev-0 ([0c6faa1](https://github.com/becem-gharbi/esp-admin/commit/0c6faa1))
- **design:** Backend design add rev-1 ([2ba3819](https://github.com/becem-gharbi/esp-admin/commit/2ba3819))
- **design:** Add backend design rev-2 ([8618825](https://github.com/becem-gharbi/esp-admin/commit/8618825))
- **design:** Add ui design rev-4 ([a58f750](https://github.com/becem-gharbi/esp-admin/commit/a58f750))

### ❤️ Contributors

- Becem Gharbi ([@becem-gharbi](http://github.com/becem-gharbi))
