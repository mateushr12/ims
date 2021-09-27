import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEstrategiaComponent } from './edit-estrategia.component';

describe('EditEstrategiaComponent', () => {
  let component: EditEstrategiaComponent;
  let fixture: ComponentFixture<EditEstrategiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEstrategiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEstrategiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
