import { Component, OnInit } from '@angular/core';
import { CarServiceService } from '../../services/car-service.service';
import { ServicePackage } from '../../models/service.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-catalog.component.html',
  styleUrls: ['./service-catalog.component.css']
})
export class ServiceCatalogComponent implements OnInit {
  packages: ServicePackage[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private carService: CarServiceService) {}

  ngOnInit() {
    this.loadPackages();
  }

  loadPackages() {
    this.isLoading = true;
    this.errorMessage = '';

    this.carService.getPackages().subscribe({
      next: (packages) => {
        this.packages = packages;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading packages', error);
        this.errorMessage = 'Failed to load packages. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  bookNow(servicePackage: ServicePackage) {
    // Implement booking logic here
    alert(`Booking ${servicePackage.name} package. This feature will be implemented soon!`);
  }
} 