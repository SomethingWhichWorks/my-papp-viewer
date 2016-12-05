import { Component, OnInit } from '@angular/core';
import { ProgressBarService } from './progress-bar.service';

@Component({
  moduleId: module.id,
  selector: 'progress-bar',
  templateUrl: 'progress-bar.component.html',
  styleUrls: ['progress-bar.component.css']
})

export class ProgressBarComponent implements OnInit {
  constructor(private progressBarService: ProgressBarService) { }
  ngOnInit(): void {
    
  }
}
