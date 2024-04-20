import { Component, OnInit } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { Pais } from '../../models/pais.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { UtilService } from '../../services/util.service';
import { Revista } from '../../models/revista.model';
import { RevistaService } from '../../services/revista.service';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario.model';
import { TokenService } from '../../security/token.service';

@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  selector: 'app-agregar-revista',
  templateUrl: './agregar-revista.component.html',
  styleUrls: ['./agregar-revista.component.css']
})
export class AgregarRevistaComponent {

  lstPais: Pais[] = [];
  lstTipoRevista: DataCatalogo[] = [];

  //registro
  objRevista: Revista = {
    nombre: "",
    frecuencia: "",
    fechaCreacion: new Date(),
    telefono: "",
    pais: {
      idPais: -1
    },
    tipoRevista: {
      idDataCatalogo: -1
    }
  }
  //EN CASO ERROR DE ACTUAIZA USUARIO

  objUsuario: Usuario = {};
  //--
  //ejecuta al inicio
  constructor(private UtilService: UtilService,
    private revistaService: RevistaService,
    private tokenService: TokenService) { //--

    this.UtilService.listaPais().subscribe(
      x => this.lstPais = x
    );
    this.UtilService.listaTipoLibroRevista().subscribe(
      x => this.lstTipoRevista = x
    );
    //--
    this.objUsuario.idUsuario = this.tokenService.getUserId();
  }

  registra() {

    this.objRevista.usuarioActualiza = this.objUsuario;
    this.objRevista.usuarioRegistro = this.objUsuario;

    this.revistaService.registrar(this.objRevista).subscribe(
      x =>
        //sweetalert
        Swal.fire({
          icon: 'info',
          title: 'Resultado del Registro',
          text: x.mensaje,
        })
    );
  }

}
