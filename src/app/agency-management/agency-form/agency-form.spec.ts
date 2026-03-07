import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyForm } from './agency-form';

describe('AgencyForm', () => {
  let component: AgencyForm;
  let fixture: ComponentFixture<AgencyForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgencyForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
