import { DataService } from './../../services/data.service';
import { Problem } from './../../models/problem.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-problem-detail',
  templateUrl: './problem-detail.component.html',
  styleUrls: ['./problem-detail.component.css']
})
export class ProblemDetailComponent implements OnInit {

  problem: Problem;

  constructor(private route: ActivatedRoute, private _dataService: DataService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // this.problem = this._dataService.getProblem(+params['id']);
      this._dataService.getProblem(+params['id'])
                       .then(data => {
                         this.problem = data;
                       })
                       .catch();
    });
  }

}
