import { Component } from '@angular/core';
import { SidebarComponent } from "../../shell/sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-panel-admin',
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './panel-admin.component.html',
  styleUrl: './panel-admin.component.css'
})
export class PanelAdminComponent {

}
