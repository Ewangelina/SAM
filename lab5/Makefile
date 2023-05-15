docker_name:=lab0_test_js
container_name:=lab0_test_container_js
port:=4080
docker_build:
	echo "Prepare docker here..."
	docker build -t $(docker_name):latest .
docker_start:
	echo "Start docker here..."
	docker run -p $(port):$(port) --name $(container_name) $(docker_name):latest &
docker_stop:
	echo "Stop docker here..."
	docker kill $(container_name)
	docker container rm $(container_name)
docker_clean:
	echo "Clean docker here..."
	-docker container rm $(container_name)
	docker image rm $(docker_name)
s:
	echo "Prepare docker here..."
	docker build -t $(docker_name):latest .
	echo "Start docker here..."
	docker run -p $(port):$(port) --name $(container_name) $(docker_name):latest &
x:
	echo "Stop docker here..."
	docker kill $(container_name)
	docker container rm $(container_name)
	echo "_________________Clean docker here..."
	-docker container rm $(container_name)
	docker image rm $(docker_name)
c:
	echo "Clean docker here..."
	-docker container rm $(container_name)
	docker image rm $(docker_name)
