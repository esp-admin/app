import { name, version, description, repository, homepage, author } from '~/package.json'

export default defineEventHandler(() => ({
  name,
  version,
  description,
  repository,
  homepage,
  author,
}))
