import { DataService } from './../../services/data.service';
import { Problem } from './../../models/problem.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit {

  problems: Problem[];

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this.getProblems();
  }

  getProblems(): void {
    this.problems = this._dataService.getProblems();
  }

}
