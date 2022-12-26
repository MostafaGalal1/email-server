import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeBoxComponent } from './compose-box.component';

describe('ComposeBoxComponent', () => {
  let component: ComposeBoxComponent;
  let fixture: ComponentFixture<ComposeBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComposeBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComposeBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
