import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/Models/iproduct';
import { ProductsAPIService } from 'src/app/Services/products-api.service';
import { DiscountOffers } from 'src/app/Models/discount.enum'; // Adjusted path
import { StoreData } from 'src/app/ViewModels/store-data'; // Adjusted path

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnChanges {
  prdListOfCat: IProduct[] = []; // List of products based on category
  @Input() receivedSelCatID: number = 0; // Received category ID from parent
  orderTotalPrice: number = 0; // Total price of ordered items
  @Output() onTotalPriceChanged: EventEmitter<number> = new EventEmitter<number>(); // Event emitter for total price change

  StoreInfo: StoreData; // Store information instance
  Discount: DiscountOffers = DiscountOffers.NoDiscount; // Store discount
  ClientName: string = ''; // Client's name
  IsPurchased: boolean = false; // Flag for purchase confirmation

  // Sample product list (You can replace it with actual data from your service)
  ProductList: IProduct[] = [
    { id: 1, name: 'Product 1', price: 10, imgURL: 'path/to/image1.png', quantity: 5 },
    { id: 2, name: 'Product 2', price: 20, imgURL: 'path/to/image2.png', quantity: 3 },
    { id: 3, name: 'Product 3', price: 15, imgURL: 'path/to/image3.png', quantity: 0 },
    // Add more products as needed
  ];

  constructor(private prdAPIService: ProductsAPIService, private router: Router) {
    // Initialize StoreInfo with actual data
    this.StoreInfo = new StoreData('Your Store Name', 'assets/logo.png', ['Branch 1', 'Branch 2']);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.receivedSelCatID);
    this.prdAPIService.getProductsByCatID(this.receivedSelCatID).subscribe(prdList => {
      this.prdListOfCat = prdList; // Update product list based on category ID
    });
  }

  ngOnInit(): void {
    this.prdAPIService.getAllProducts().subscribe(prdList => {
      this.prdListOfCat = prdList; // Fetch all products initially
    });
  }

  productsTrackBy(index: number, item: IProduct) {
    return item.id; // Track by product ID for efficient rendering
  }

  updateOrderTotalPrice(itemsCount: number, price: number) {
    this.orderTotalPrice += (itemsCount * price); // Update total price
    this.onTotalPriceChanged.emit(this.orderTotalPrice); // Emit event
  }

  openProductDetails(prdID: number) {
    this.router.navigate(['/Products', prdID]); // Navigate to product details
  }

  togglePurchase() {
    this.IsPurchased = !this.IsPurchased; // Toggle purchase confirmation
  }
}
