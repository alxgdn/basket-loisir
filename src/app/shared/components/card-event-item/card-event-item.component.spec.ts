import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEventItemComponent } from './card-event-item.component';

describe('CardEventItemComponent', () => {
  let component: CardEventItemComponent;
  let fixture: ComponentFixture<CardEventItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardEventItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardEventItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
