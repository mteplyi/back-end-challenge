## Push App images to Docker Hub
```shell
# Build images
docker-compose build --compress
# Push images
docker-compose push
```

## Start App using images from Docker Hub
```shell
# Pull images
docker-compose pull
# Push services
docker-compose up
```
