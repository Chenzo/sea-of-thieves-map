#!/bin/sh


# permission file: chmod u+x /path/to/file.command


#sotm_v1_01.jpg
row=1
col=1
BASEDIR=$(dirname "$0")

for i in {1..676}
do
    cname=$i
    if [ "$cname" -lt 10 ]
    then
        cname="0$cname"
    fi
    
    echo "rename $cname to $row-$col"
    mv $BASEDIR/../www/images/tiles/{sotm_v1_$cname.jpg,sotm_v1_$row-$col.jpg}

    col=$(($col+1))
    if [ "$col" = 27 ]
    then
        col=1
        row=$(($row+1))
    fi
done

#echo $PWD
