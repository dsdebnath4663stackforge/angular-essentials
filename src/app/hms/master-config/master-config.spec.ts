import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterConfig } from './master-config';

describe('MasterConfig', () => {
  let component: MasterConfig;
  let fixture: ComponentFixture<MasterConfig>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterConfig]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterConfig);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
