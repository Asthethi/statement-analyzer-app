import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementUploadDialogComponent } from './statement-upload-dialog.component';

describe('StatementUploadDialogComponent', () => {
  let component: StatementUploadDialogComponent;
  let fixture: ComponentFixture<StatementUploadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatementUploadDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatementUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
