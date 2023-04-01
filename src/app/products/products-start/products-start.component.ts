import { Component, OnInit } from '@angular/core';
import { DataFilterService } from 'src/app/shared/data-filter.service';

@Component({
  selector: 'app-products-start',
  templateUrl: './products-start.component.html',
})
export class ProductsStartComponent implements OnInit {

  constructor(private dataFilterService: DataFilterService) { }

  ngOnInit(): void {


  }

}
