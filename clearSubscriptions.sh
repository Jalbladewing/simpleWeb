#!/bin/bash

failures=0
name=test

# never exit
while (("$failures" < 9999));
do
	name=$(curl -s 'http://192.168.183.128:1026/v2/subscriptions' | ./jq-win64.exe -r '.[0].id')
	curl -X DELETE "http://192.168.183.128:1026/v2/subscriptions/${name}"
	sleep 1
done