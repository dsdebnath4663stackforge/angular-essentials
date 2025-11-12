import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cpoe } from './cpoe';

describe('Cpoe', () => {
  let component: Cpoe;
  let fixture: ComponentFixture<Cpoe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cpoe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cpoe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
