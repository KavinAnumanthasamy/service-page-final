import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarServiceService } from '../../services/car-service.service';
import { CarService } from '../../models/service.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-package',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mt-4">
      <h2>Create Service Package</h2>
      <form [formGroup]="packageForm" (ngSubmit)="onSubmit()">
        <div class="mb-3">
          <label for="name" class="form-label">Package Name</label>
          <input type="text" class="form-control" id="name" formControlName="name">
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea class="form-control" id="description" formControlName="description"></textarea>
        </div>
        <div class="mb-3">
          <label for="duration" class="form-label">Duration (hours)</label>
          <input type="number" class="form-control" id="duration" formControlName="duration">
        </div>
        <div class="mb-3">
          <label class="form-label">Select Services</label>
          <div *ngFor="let service of availableServices">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" 
                     [value]="service.id" 
                     (change)="onServiceSelect($event, service)">
              <label class="form-check-label">
                {{service.name}} - ₹{{service.price}}
              </label>
            </div>
          </div>
        </div>
        <div class="mb-3">
          <strong>Total Price: ₹{{calculateTotalPrice()}}</strong>
        </div>
        <button type="submit" class="btn btn-primary" [disabled]="!packageForm.valid">Create Package</button>
      </form>
    </div>
  `
})
export class AddPackageComponent implements OnInit {
  packageForm: FormGroup;
  availableServices: CarService[] = [];
  selectedServices: CarService[] = [];

  constructor(
    private fb: FormBuilder,
    private carService: CarServiceService
  ) {
    this.packageForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    this.carService.getServices().subscribe({
      next: (services) => this.availableServices = services,
      error: (error) => console.error('Error loading services', error)
    });
  }

  onServiceSelect(event: any, service: CarService) {
    if (event.target.checked) {
      this.selectedServices.push(service);
    } else {
      this.selectedServices = this.selectedServices.filter(s => s.id !== service.id);
    }
  }

  calculateTotalPrice(): number {
    return this.selectedServices.reduce((sum, service) => sum + service.price, 0);
  }

  onSubmit() {
    if (this.packageForm.valid && this.selectedServices.length > 0) {
      const packageData = {
        ...this.packageForm.value,
        services: this.selectedServices,
        totalPrice: this.calculateTotalPrice()
      };

      this.carService.addPackage(packageData).subscribe({
        next: (response) => {
          console.log('Package created successfully', response);
          this.packageForm.reset();
          this.selectedServices = [];
        },
        error: (error) => console.error('Error creating package', error)
      });
    }
  }
} 