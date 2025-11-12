import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ipd } from './ipd';

describe('Ipd', () => {
  let component: Ipd;
  let fixture: ComponentFixture<Ipd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ipd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ipd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
