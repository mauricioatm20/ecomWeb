import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCComponent } from './dashboard-c.component';

describe('DashboardCComponent', () => {
  let component: DashboardCComponent;
  let fixture: ComponentFixture<DashboardCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
