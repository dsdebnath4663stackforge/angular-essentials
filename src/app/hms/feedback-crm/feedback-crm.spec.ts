import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackCrm } from './feedback-crm';

describe('FeedbackCrm', () => {
  let component: FeedbackCrm;
  let fixture: ComponentFixture<FeedbackCrm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackCrm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackCrm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
