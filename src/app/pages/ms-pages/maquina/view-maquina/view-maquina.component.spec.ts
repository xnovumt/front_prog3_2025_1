import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMaquinaComponent } from './view-maquina.component';

describe('ViewMaquinaComponent', () => {
  let component: ViewMaquinaComponent;
  let fixture: ComponentFixture<ViewMaquinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMaquinaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMaquinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
