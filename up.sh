#!/bin/bash

USERNAME=$(whoami)

CURRENTSHELL=$(getent passwd | grep $USERNAME | cut -d: -f7 | xargs basename)

if [ "$CURRENTSHELL" != "zsh" ]
then
    which zsh || sudo apt-get install zsh
    echo "Please enter your password to change your shell to zsh"
    chsh $(which zsh)
fi

which git || sudo apt-get install git
which vcsh || sudo apt-get install vcsh

vcsh clone git@github.com:Mezzle/mr.git
mr up

echo "Setup is done. Please reconnect/relaunch"
