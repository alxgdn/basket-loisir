import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPhotoItemComponent } from './card-photo-item.component';

describe('CardPhotoItemComponent', () => {
  let component: CardPhotoItemComponent;
  let fixture: ComponentFixture<CardPhotoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPhotoItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardPhotoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
