FROM ubuntu:21.10
ARG USERNAME=test
ARG PASSWORD=test

# ssh installation
RUN apt update && apt install openssh-server vim tree -y

# RUN ln -s /bin/bash /bin/rbash

# user creation
RUN useradd -rm -s /bin/rbash ${USERNAME} 
RUN  echo "${USERNAME}:${PASSWORD}" | chpasswd
RUN mkdir /home/${USERNAME}/bin

# adding commands
RUN ln -s /bin/ls /home/${USERNAME}/bin/ls
RUN ln -s /bin/ping /home/${USERNAME}/bin/ping
RUN ln -s /bin/clear /home/${USERNAME}/bin/clear
# RUN ln -s /bin/vim /home/${USERNAME}/bin/vim
RUN ln -s /bin/tree /home/${USERNAME}/bin/tree

# create .bash_profile
COPY configs/.bash_profile /home/${USERNAME}/.bash_profile

# prevent .bash_profile modification
RUN chown root. /home/${USERNAME}/.bash_profile
RUN chmod 755 /home/${USERNAME}/.bash_profile
RUN chattr +i /home/${USERNAME}/.bash_profile

RUN service ssh start

EXPOSE 22

CMD ["/usr/sbin/sshd","-D"]