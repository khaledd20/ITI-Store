import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/Models/iproduct';
import { ProductsAPIService } from 'src/app/Services/products-api.service';
import { ProductsService } from 'src/app/Services/products.service';
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
  todayDate: Date = new Date();

  StoreInfo: StoreData; // Store information instance
  Discount: DiscountOffers = DiscountOffers.NoDiscount; // Store discount
  ClientName: string = ''; // Client's name
  selectedCategoryID: string = '';

  categories = [
    { id: 1, name: 'Clothing' },
    { id: 2, name: 'Electronics' },
    { id: 3, name: 'Home Appliances' },
    // Add more categories if necessary
  ];

  // Sample product list (You can replace it with actual data from your service)
  /*ProductList: IProduct[] = [
    { id: 1, name: 'Black T-Shirt', price: 10, imgURL: 'assets/BlackTShirt.png', quantity: 5, catID:1 },
    { id: 2, name: 'Blue Jeans', price: 20, imgURL: 'assets/BlackTShirt.png', quantity: 3, catID:2 },
    { id: 3, name: 'Green Jacket', price: 15, imgURL: 'assets/BlackTShirt.png', quantity: 1, catID:3 },
    { id: 4, name: 'white dress', price: 40, imgURL: 'assets/BlackTShirt.png', quantity: 0, catID:3 },

    // Add more products as needed
  ];*/

  //filteredProductList = this.ProductList; // Start with all products
  filteredProductList: IProduct[] = []; // To hold filtered products
  isPurchased: boolean = false;
  constructor(private prdService: ProductsService, private router: Router) {
    // Initialize StoreInfo with actual data
    this.StoreInfo = new StoreData('Zara', 'assets/logo.png', ['Cairo Branch', 'Alexandria Branch ']);
  }


    // Method to filter products by selected category
       filterProductsByCategory() {
      if (this.selectedCategoryID) {
        this.filteredProductList = this.prdListOfCat.filter(product => product.catID === +this.selectedCategoryID && product.quantity > 0);
      } else {
        this.filteredProductList = this.prdListOfCat.filter(product => product.quantity > 0); // Show only products with quantity > 0
      }
    }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.receivedSelCatID);
    /*this.prdAPIService.getProductsByCatID(this.receivedSelCatID).subscribe({
      next: (prdList) => this.prdListOfCat = prdList,  // Update product list based on category ID
      error: (err) => console.error('Failed to fetch products for category', err) // Handle error
    });*/
    //this.filterProductsByCategory(); // Filter products whenever received category changes
    this.prdListOfCat=this.prdService.getProductsByCateogryID(this.receivedSelCatID);
    //this.prdListOfCat=this.prdListOfCat.filter(prd=> prd.catID==this.receivedSelCatID);


  }
  
  ngOnInit(): void {
    /*this.prdAPIService.getAllProducts().subscribe({
      next: (prdList) => this.prdListOfCat = prdList, // Fetch all products initially
      error: (err) => console.error('Failed to fetch all products', err) // Handle error
    });*/
    this.prdListOfCat=this.prdService.getProductsByCateogryID(this.receivedSelCatID);

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
    this.isPurchased = true; // Set the purchased flag
  }

  // Method to buy a product and decrease quantity
  buyProduct(product: IProduct) {
    if (product.quantity > 0) {
      product.quantity -= 1; // Decrease quantity by 1
      this.filterProductsByCategory(); // Refresh filtered product list
    }
  }
  
}
