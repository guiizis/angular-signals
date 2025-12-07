import { Component, inject } from "@angular/core";
import { MessagesService } from "./messages.service";
import { NgClass } from "@angular/common";

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  imports: [
    NgClass
  ]
})
export class MessagesComponent {
  private readonly messagesService = inject(MessagesService);
  public readonly message = this.messagesService.message;

  OnClose() {
    this.messagesService.clear();
  }

}
