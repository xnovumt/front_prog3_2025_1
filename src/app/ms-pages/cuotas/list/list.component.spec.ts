import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuotaComponent } from './list.component';

describe('ListQuotaComponent ', () => {
  let component: ListQuotaComponent;
  let fixture: ComponentFixture<ListQuotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListQuotaComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListQuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
