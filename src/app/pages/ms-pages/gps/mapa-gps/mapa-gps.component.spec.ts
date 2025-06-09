import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapaGpsComponent } from './mapa-gps.component';


describe('MapaGpsComponent', () => {
  let component: MapaGpsComponent;
  let fixture: ComponentFixture<MapaGpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaGpsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaGpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
