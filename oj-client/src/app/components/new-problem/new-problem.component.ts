import { DataService } from './../../services/data.service';
import { Problem } from './../../models/problem.model';
import { Component, OnInit } from '@angular/core';

const DEFAULT_PROBLEM = Object.freeze({
  id: 0,
  name: '',
  desc: '',
  difficulty: 'Easy'
});

@Component({
  selector: 'app-new-problem',
  templateUrl: './new-problem.component.html',
  styleUrls: ['./new-problem.component.css']
})
export class NewProblemComponent implements OnInit {

  public newProblem: Problem = Object.assign({}, DEFAULT_PROBLEM);
  public difficulties: string[] = ['Easy', 'Medium', 'Hard', 'Super'];

  constructor(private _dataService: DataService) { }

  ngOnInit() {
  }

  addProblem(): void {
    this._dataService.addProblem(this.newProblem)
                     .then()
                     .catch(error => {
                       console.log(error.body);
                     });

    this.newProblem = Object.assign({}, DEFAULT_PROBLEM);
  }

}
