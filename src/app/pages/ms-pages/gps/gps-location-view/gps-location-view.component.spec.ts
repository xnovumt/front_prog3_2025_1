import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpsLocationViewComponent } from './gps-location-view.component';

describe('GpsLocationViewComponent', () => {
  let component: GpsLocationViewComponent;
  let fixture: ComponentFixture<GpsLocationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpsLocationViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GpsLocationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
