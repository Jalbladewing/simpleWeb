#!/bin/bash

failures=0
number=0
name=test
temperature=0
humidity=0
pressure=0

# never exit
while (("$failures" < 9999));
do
	name=$(curl -s 'http://api.thingspeak.com/channels/838086/feeds.json?results=1' | ./jq-win64.exe -r '.channel.name')
	name=${name/ñ/n}
	temperature=$(curl -s 'http://api.thingspeak.com/channels/838086/feeds.json?results=1' | ./jq-win64.exe -r '.feeds[0].field3')
	humidity=$(curl -s 'http://api.thingspeak.com/channels/838086/feeds.json?results=1' | ./jq-win64.exe -r '.feeds[0].field4')
	curl -iX PUT --url "http://192.168.183.128:1026/v2/entities/${name}/attrs/temperature/value"   --header 'Content-Type: text/plain'   --data $temperature
	curl -iX PUT --url "http://192.168.183.128:1026/v2/entities/${name}/attrs/humidity/value"   --header 'Content-Type: text/plain'   --data $humidity

	name=$(curl -s 'http://api.thingspeak.com/channels/808803/feeds.json?results=1' | ./jq-win64.exe -r '.channel.name')
	name=${name// /_}
	temperature=$(curl -s 'http://api.thingspeak.com/channels/808803/feeds.json?results=1' | ./jq-win64.exe -r '.feeds[0].field1')
	humidity=$(curl -s 'http://api.thingspeak.com/channels/808803/feeds.json?results=1' | ./jq-win64.exe -r '.feeds[0].field2')
	pressure=$(curl -s 'http://api.thingspeak.com/channels/808803/feeds.json?results=1' | ./jq-win64.exe -r '.feeds[0].field5')
	curl -iX PUT --url "http://192.168.183.128:1026/v2/entities/${name}/attrs/temperature/value"   --header 'Content-Type: text/plain'   --data $temperature
	curl -iX PUT --url "http://192.168.183.128:1026/v2/entities/${name}/attrs/humidity/value"   --header 'Content-Type: text/plain'   --data $humidity
	curl -iX PUT --url "http://192.168.183.128:1026/v2/entities/${name}/attrs/pressure/value"   --header 'Content-Type: text/plain'   --data $pressure

	name=$(curl -s 'http://api.thingspeak.com/channels/846381/feeds.json?results=1' | ./jq-win64.exe -r '.channel.name')
	name=${name// /_}
	name=${name/í/i}
	temperature=$(curl -s 'http://api.thingspeak.com/channels/846381/feeds.json?results=1' | ./jq-win64.exe -r '.feeds[0].field2')
	humidity=$(curl -s 'http://api.thingspeak.com/channels/846381/feeds.json?results=1' | ./jq-win64.exe -r '.feeds[0].field3')
	pressure=$(curl -s 'http://api.thingspeak.com/channels/846381/feeds.json?results=1' | ./jq-win64.exe -r '.feeds[0].field4')
	curl -iX PUT --url "http://192.168.183.128:1026/v2/entities/${name}/attrs/temperature/value"   --header 'Content-Type: text/plain'   --data $temperature
	curl -iX PUT --url "http://192.168.183.128:1026/v2/entities/${name}/attrs/humidity/value"   --header 'Content-Type: text/plain'   --data $humidity
	curl -iX PUT --url "http://192.168.183.128:1026/v2/entities/${name}/attrs/pressure/value"   --header 'Content-Type: text/plain'   --data $pressure

	name=$(curl -s 'http://api.thingspeak.com/channels/606355/feeds.json?results=1' | ./jq-win64.exe -r '.channel.name')
	name=${name// /_}
	name=${name/\'/}
	temperature=$(curl -s 'http://api.thingspeak.com/channels/606355/feeds.json?results=1' | ./jq-win64.exe -r '.feeds[0].field1')
	humidity=$(curl -s 'http://api.thingspeak.com/channels/606355/feeds.json?results=1' | ./jq-win64.exe -r '.feeds[0].field2')
	pressure=$(curl -s 'http://api.thingspeak.com/channels/606355/feeds.json?results=1' | ./jq-win64.exe -r '.feeds[0].field3')
	curl -iX PUT --url "http://192.168.183.128:1026/v2/entities/${name}/attrs/temperature/value"   --header 'Content-Type: text/plain'   --data $temperature
	curl -iX PUT --url "http://192.168.183.128:1026/v2/entities/${name}/attrs/humidity/value"   --header 'Content-Type: text/plain'   --data $humidity
	curl -iX PUT --url "http://192.168.183.128:1026/v2/entities/${name}/attrs/pressure/value"   --header 'Content-Type: text/plain'   --data $pressure
	sleep 1
done