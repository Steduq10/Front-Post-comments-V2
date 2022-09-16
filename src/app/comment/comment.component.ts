import { Component, OnInit, Input } from '@angular/core';
import { CommentType } from '../post';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment!: CommentType;

  constructor() { }

  ngOnInit(): void {
  }

}
