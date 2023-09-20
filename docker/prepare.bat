mkdir emqx
docker run -d --name emqx-tmp emqx/emqx
docker cp emqx-tmp:/opt/emqx/etc ./emqx/etc
docker stop emqx-tmp
docker remove emqx-tmp

mkdir mongodb
docker-compose up -d
docker exec -it nuxt npx prisma db push --skip-generate

docker-compose stop
pause