import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ApiService } from '../Services/api.service';
import { CartService } from '../Services/cart.service';

@Component({
  selector: 'app-productsdetail',
  templateUrl: './productsdetail.component.html',
  styleUrls: ['./productsdetail.component.css']
})
export class ProductsdetailComponent implements OnInit {

  //for star template
  public star: number[] = [1, 2, 3, 4, 5];
  //public bc they will reached by template
  public productsDetail: any;
  public currentId!: number;

  constructor(private route: ActivatedRoute, private api: ApiService, private cartService: CartService, private toastr: ToastrService) { }

  ngOnInit(): void {
    //With paramMap you can route multiple page with only one template 
    let itemId: any = this.route.snapshot.paramMap.get("id");
    this.currentId = Number(itemId);
    //For template view taking data from server 
    //CURRENT ID API YE YOLLA GELENİ KAYDET SADECE 
    this.api.getAllProductApi().subscribe(
      res => {
        this.productsDetail = res;
    })
  }

  addtocart(item: any){
    //adding to cart from product detail page
    this.cartService.addtoCart(item);
    this.toastr.success('Ürün Sepete Eklendi', 'Checkout');
  }
}
