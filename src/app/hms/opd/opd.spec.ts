import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Opd } from './opd';

describe('Opd', () => {
  let component: Opd;
  let fixture: ComponentFixture<Opd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Opd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Opd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
