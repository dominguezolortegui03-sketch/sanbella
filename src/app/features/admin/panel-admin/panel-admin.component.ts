import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../../shell/sidebar/sidebar.component';

@Component({
  selector: 'app-panel-admin',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './panel-admin.component.html',
  styleUrl: './panel-admin.component.css'
})
export class PanelAdminComponent {

}
