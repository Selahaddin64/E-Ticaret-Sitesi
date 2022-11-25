import { Component, OnInit } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { ApiService } from '../Services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  public cartItems: any = [];
  public grandTotal: any = 0;

  constructor(private cartService: CartService, private api:ApiService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe(res => {
        this.cartItems = res;
        this.cartItems.forEach((item: any) => {
          Object.assign(item, { quantity: 1, total: Number(item.price) });
          //commentler sipariş ekranına gitmesin diye 
          delete item.comment;
        });
        for(let item of this.cartItems){
          this.grandTotal += Number(item.total);
        }
        console.log(this.cartItems);
      });
  }

  quantity(quantity:any, index:number){
    this.cartItems[index].quantity = Number(quantity.target.value);
    this.cartItems[index].total = Number(this.cartItems[index].price*quantity.target.value);
    console.log(this.cartItems[index].total);
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }
  //add to the cart ı cağırıp item in adından 1 tane daha karta ekleme yapılabilir.ama sayaç nasıl çalıaşacak belli değil
  checkout(){
    let user:any = this.api.getToken();
    let orderNumber = Math.floor(Math.random()*1000000);
    let order:any = [{"user": user, "ordernumber": orderNumber}, {"order": this.cartItems}];
    this.api.checkoutApi(order).subscribe();
    this.toastr.success('Başarıyla sipariş verdin', 'Checkout');
    this.cartService.removeAllCart();
    this.router.navigate(["orders"]);
  }
}

