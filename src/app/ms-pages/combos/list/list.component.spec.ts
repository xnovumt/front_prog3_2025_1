import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComboComponent } from './list.component';

describe('ListComboComponent', () => {
  let component: ListComboComponent;
  let fixture: ComponentFixture<ListComboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComboComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
