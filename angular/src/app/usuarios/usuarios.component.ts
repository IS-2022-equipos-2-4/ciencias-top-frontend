import { Component, OnInit } from '@angular/core';

import { faEye, faEdit, faTrashAlt, faCheck,  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  faEye = faEye;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faCheck = faCheck;
  //faCross = faCross;

  constructor() {}

  ngOnInit(): void {}
}
