import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-delete',
  templateUrl: './color-delete.component.html',
  styleUrls: ['./color-delete.component.css']
})
export class ColorDeleteComponent implements OnInit {
  deletedColor: Color;

  constructor(
    private toastrService:ToastrService,
    private colorService:ColorService,
    private deleteColorModal: MatDialogRef<ColorDeleteComponent>) { }

  ngOnInit(): void {
  }

  delete(color: Color) {
    this.colorService.delete(color).subscribe(response => {
      this.toastrService.success(color.colorName + " isimli renk silindi", "Silme işlemi başarılı")
      this.closeColorDeleteModal();
    }, errorResponse => {
      this.toastrService.error(errorResponse.error.message, "Silme işlemi başarısız")
    })
  }
  closeColorDeleteModal() {
    this.deleteColorModal.close();
  }
}
