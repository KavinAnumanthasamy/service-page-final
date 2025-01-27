import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarServiceService } from '../../services/car-service.service';
import { ServicePackage } from '../../models/service.model';

@Component({
  selector: 'app-view-packages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-packages.component.html',
  styleUrls: ['./view-packages.component.css']
})
export class ViewPackagesComponent implements OnInit {
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

  deletePackage(id: string) {
    if (confirm('Are you sure you want to delete this package?')) {
      // Implement delete functionality here
      console.log('Deleting package:', id);
    }
  }
} 