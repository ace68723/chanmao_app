#!/bin/bash
PATHNAME="./ios"
FILES="./*"

#PATHNAME is the location that need to be locked


arg2="$1"

LoopFiles () {

	arg1=*

	for f in $arg1
	do
		if [ -f $f ]
		then

			echo "****git update-index --assume-unchanged $f"
			git update-index --assume-unchanged $f

		elif [ -d $f ]
		then
			echo "directory $f"
			git update-index --assume-unchanged $f"/"
			cd $f
			LoopFiles
		fi
	done

	cd ..

}

CDinto() {
    cd $PATHNAME
    LoopFiles $FILES
}

CDinto $FILES

Commit () {

    #git rm -r --cached .
    git add *
    git commit -m "$arg2"
    git push
}


echo "Would you like to commit? (Yes/No)"
echo "you are in"

select yn in "Yes" "No"
do

    case $yn in
        Yes ) Commit $arg2; break;;
        No ) exit;;
    esac
done
