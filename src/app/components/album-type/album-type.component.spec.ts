import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumTypeComponent } from './album-type.component';

describe('AlbumTypeComponent', () => {
  let component: AlbumTypeComponent;
  let fixture: ComponentFixture<AlbumTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
