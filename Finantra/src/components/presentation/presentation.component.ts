import { Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.css'
})
export class PresentationComponent {
  @Input() presentationText:string;
  @Input() srcImg:string;
  @Output() newItemEvent = new EventEmitter<string>();


  send():void{
    let text=document.getElementById("textInput") as HTMLInputElement;
    this.newItemEvent.emit(text.value);
  }
}
