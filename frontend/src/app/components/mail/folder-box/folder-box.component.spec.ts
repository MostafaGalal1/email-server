import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderBoxComponent } from './folder-box.component';

describe('FolderBoxComponent', () => {
  let component: FolderBoxComponent;
  let fixture: ComponentFixture<FolderBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolderBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FolderBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
