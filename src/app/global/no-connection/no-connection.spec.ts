import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoConnection } from './no-connection';

describe('NoConnection', () => {
  let component: NoConnection;
  let fixture: ComponentFixture<NoConnection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoConnection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoConnection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
