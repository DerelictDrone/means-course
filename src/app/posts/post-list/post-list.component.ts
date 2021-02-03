import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-post-list',
  templateUrl: 'post-list.component.html',
  styleUrls: ['post-list.component.css']
})
export class PostListComponent {
/*  posts = [
    {title: 'Post 1', content: 'A'},
    {title: 'Post 2', content: 'B'},
    {title: 'Post 3', content: 'C'}
  ];
}*/
  @Input() posts = [{title: '', content: ''},];
};
