# Docker tutorials

Tutorial Docker del venerdì :pineapple:

### Installazione di `Docker` :whale2:

Per installare docker su sistemi unix:

#### Ubuntu Linux (>18.04)

Installare il pacchetto:

```sh
sudo apt install docker.io
```

Avviare ed abilitare il servizio di sistema:

```sh
sudo systemctl enable --now docker
```

Usare docker senza i permessi di root:

```sh
# Aggiungere l'utente al gruppo 
sudo usermod -aG docker {UTENTE}
# Aggiornare i permessi sul gruppo (o terminare la sessione)
sudo newgrp docker
# Abilitare l'utente ai file di configurazione locale di docker
sudo chown "$USER":"$USER" /home/"$USER"/.docker -R
sudo chmod g+rwx "$HOME/.docker" -R
# Abilitare i permessi del gruppo ai file di esecuzione
sudo chown root:docker /var/run/docker.sock
sudo chown -R root:docker /var/run/docker
```

#### MacOS

Seguire la guida ufficiale per l'installazione di docker desktop

- https://docs.docker.com/docker-for-mac/install/

Terminata la guida si può utilizzare la terminale

#### Verificare le installazioni

```sh
docker --version
```



### Installare `Docker Compose` :octopus:

#### Ubuntu Linux (>18.04)

```sh
sudo apt install docker-compose
```

#### MacOS

Viene già preinstallato con Docker Desktop

#### Verificare le installazioni

```sh
docker-compose --version
```

