import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProcess } from './list-process';

describe('ListProcess', () => {
  let component: ListProcess;
  let fixture: ComponentFixture<ListProcess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProcess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProcess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
