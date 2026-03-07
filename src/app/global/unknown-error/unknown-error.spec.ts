import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnknownError } from './unknown-error';

describe('UnknownError', () => {
  let component: UnknownError;
  let fixture: ComponentFixture<UnknownError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnknownError]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnknownError);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
