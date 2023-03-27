import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsByTitlesComponent } from './songs-by-titles.component';

describe('SongsByTitlesComponent', () => {
  let component: SongsByTitlesComponent;
  let fixture: ComponentFixture<SongsByTitlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongsByTitlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongsByTitlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
