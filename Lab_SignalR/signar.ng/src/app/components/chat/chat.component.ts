import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Channel, UserEntry } from '../../models/models';
import { AuthenticationService } from 'src/app/services/authentication.service';

// On doit commencer par ajouter signalr dans les node_modules: npm install @microsoft/signalr
// Ensuite on inclut la librairie
import * as signalR from "@microsoft/signalr"

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent  {

  message: string = "test";
  messages: string[] = [];

  usersList:UserEntry[] = [];
  channelsList:Channel[] = [];

  isConnectedToHub: boolean = false;

  newChannelName: string = "";

  selectedChannel:Channel | null = null;
  selectedUser:UserEntry | null = null;

  private hubConnection?: signalR.HubConnection

  constructor(public http: HttpClient, public authentication:AuthenticationService){

  }

  connectToHub() {
    // On commence par créer la connexion vers le Hub
    this.hubConnection = new signalR.HubConnectionBuilder()
                              .withUrl('http://localhost:5106/chat', { accessTokenFactory: () => localStorage.getItem("token")! })
                              .build();

    // On peut commencer à écouter pour les messages que l'on va recevoir du serveur
    this.hubConnection.on('UsersList', (data) => {
      this.usersList = data;
    });

    // TODO: Écouter le message pour mettre à jour la liste de channels

    this.hubConnection.on('NewMessage', (message) => {
      this.messages.push(message);
    });

    // TODO: Écouter le message pour quitter un channel (lorsque le channel est effacé)

    // On se connecte au Hub
    this.hubConnection
      .start()
      .then(() => {
        this.isConnectedToHub = true;
      })
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  joinChannel(channel: Channel) {
    let selectedChannelId = this.selectedChannel ? this.selectedChannel.id : 0;
    this.hubConnection!.invoke('JoinChannel', selectedChannelId, channel.id);
    this.selectedChannel = channel;
  }

  sendMessage() {
    let selectedChannelId = this.selectedChannel ? this.selectedChannel.id : 0;
    this.hubConnection!.invoke('SendMessage', this.message, selectedChannelId, this.selectedUser?.value);
  }

  userClick(user:UserEntry) {
    if(user == this.selectedUser){
      this.selectedUser = null;
    }
  }

  createChannel(){
    // TODO: Ajouter un invoke
  }

  deleteChannel(channel: Channel){
    // TODO: Ajouter un invoke
  }

  leaveChannel(){
    let selectedChannelId = this.selectedChannel ? this.selectedChannel.id : 0;
    this.hubConnection!.invoke('JoinChannel', selectedChannelId, 0);
    this.selectedChannel = null;
  }
}
