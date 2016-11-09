import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Message } from '../models/message';
import { PhraseAppService } from '../../services/phrase-app.service';

@Component({
  moduleId: module.id,
  selector: 'message-details',
  templateUrl: 'message-details.component.html',
  styleUrls: ['message-details.component.css']
})

export class MessageDetailsComponent implements OnInit {
  @Input() message: Message;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here

  constructor(
    private phraseAppService: PhraseAppService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['key'] !== undefined) {
        let key = + params['key'];
        this.navigated = true;

        this.phraseAppService.getMessageDetails(params['key'])
          .then(message => this.message = message);

      } else {
        this.navigated = false;
        this.message = new Message();
      }
    });
  }

  /*goBack(savedHero: Message = null): void {
    this.close.emit(savedHero);
    if (this.navigated) { window.history.back(); }
  }*/
}
