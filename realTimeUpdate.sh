#!/bin/bash

failures=0
number=0

# never exit
while (("$failures" < 9999));
do
	number=$((20 + RANDOM%(1+27-20)))
	curl -iX PUT --url 'http://192.168.183.128:1026/v2/entities/Room1/attrs/temperature/value'   --header 'Content-Type: text/plain'   --data $number
	sleep 1
done