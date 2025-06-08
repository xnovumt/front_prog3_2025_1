import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { usuarioProfileComponent } from './usuario-profile.component';

describe('usuarioProfileComponent', () => {
  let component: usuarioProfileComponent;
  let fixture: ComponentFixture<usuarioProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [usuarioProfileComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(usuarioProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
