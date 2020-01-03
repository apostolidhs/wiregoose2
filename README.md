# wiregoose2

All news in one place

## Image proxy

https://github.com/willnorris/imageproxy

mkdir /tmp/ttt && chown \$(whoami) /tmp/ttt

docker run -u \$(id -u) -v /tmp/ttt:/tmp/imageproxy -p 8080:8080 willnorris/imageproxy -addr 0.0.0.0:8080 -cache /tmp/imageproxy -cache memory:1024:48h -verbose

http://0.0.0.0:8080/300x,q60,sc,jpeg/https://i1.prth.gr/images/963x541/files/2020-01-01/mitsotakis-netaniaxou00.jpg

sharp.pixelplumbing.com
