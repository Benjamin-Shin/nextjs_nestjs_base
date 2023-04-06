sudo docker rm -f endev-pg14
sudo mkdir -p $PWD/mount/data
sudo docker run -d  \
    --name endev-pg14 \
    -p 35432:5432 \
    -e POSTGRES_PASSWORD=CANal1 \
    -e PGDATA=/var/lib/postgresql/data/pgdata \
    -v $PWD/mount/data:/var/lib/postgresql/data \
    endev-postgresql:14.4