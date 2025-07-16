import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingLayout } from './tracking-layout';

describe('TrackingLayout', () => {
  let component: TrackingLayout;
  let fixture: ComponentFixture<TrackingLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackingLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackingLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
