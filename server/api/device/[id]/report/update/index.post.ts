import { z } from 'zod'

export default defineEventHandler(async (event) => {
  interface Body {
    releaseId: Release['id'];
    deploymentId: Deployment['id'];
    status: Deployment['status'];
  }

  const { id: deviceId } = await checkDevice(event)

  const body = await readBody<Body>(event)

  const schema = z.object({
    status: z.string().min(1)
  })

  schema.parse({ status: body.status })

  if (body.status === 'started') {
    const deployment = await event.context.prisma.deployment.create({
      data: {
        deviceId,
        device: {
          connect: {
            id: deviceId
          }
        },
        release: {
          connect: {
            id: body.releaseId
          }
        }
      },
      select: {
        id: true
      }
    }).catch((e) => { throw createPrismaError(e) })

    return deployment.id
  }

  const deployment = await event.context.prisma.deployment.update({
    where: {
      id: body.deploymentId
    },
    data: {
      status: body.status
    },
    select: {
      id: true
    }
  }).catch((e) => { throw createPrismaError(e) })

  return deployment.id
})
