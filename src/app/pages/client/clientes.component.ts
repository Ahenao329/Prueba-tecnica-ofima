import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from './services/client-service.service';
import { HttpClientModule,  } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { errorMessages, regExps } from '../../core/util/Validaciones.service';
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    RouterOutlet
  ],
  providers: [HttpClientModule,],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent implements OnInit {
  listClient: Array<any> = [];
  listPaises: Array<any> = [];
  listDepartamentos: Array<any> = [];
  listCiudades: Array<any> = [];
  formLogin: any;
  errors = errorMessages;
  accion = 'Agregar Cliente';
  cliente: any;
  id:number | undefined;
  selectedPais: any = null;
  
  constructor( 
    private _clienteService: ClientServiceService,
    private _formBuilder: FormBuilder
  ) {

    this.formLogin = this._formBuilder.group({
      identification: ['', Validators.compose([
                          Validators.maxLength(30),
                          Validators.pattern(regExps['nit'])
      ]),
      ],
      name: ['', Validators.compose([
                Validators.maxLength(30)]),
      ],
      nameCommercial: ['', Validators.compose([
                          Validators.maxLength(30), ]),
      ],
      email: ['', Validators.compose([
                  Validators.maxLength(30),
                  Validators.pattern(regExps['email'])
      ]),],
      phoneEnterprise: ['', Validators.compose([
                  Validators.maxLength(10),
                  Validators.pattern(regExps['Telefono'])
        ]),
      ],
      pageWeb: ['', Validators.compose([
                    Validators.maxLength(50)]),
      ],
      idCity: ['', Validators.compose([
                    Validators.maxLength(50)
      ]),],
      address: ['', Validators.compose([
                    Validators.maxLength(50)]),
      ],
      twitter: ['', Validators.compose([
                    Validators.maxLength(150)]),
      ],
      linkedin: ['', Validators.compose([
                    Validators.maxLength(150)]),
      ],
      instagram: ['', Validators.compose([
                    Validators.maxLength(150)]),
      ],
      facebook: ['',Validators.compose([
                    Validators.maxLength(150)]),
      ],
    });

  }
  

  ngOnInit(): void {
    this.obtenerCliente();
    this.obtenerPaises();
    this.obtenerDepartamento('7d43bea1-2760-4a1d-993b-46be7e3b3287');
    this.obtenerCiudades('7d43bea1-2760-4a1d-993b-46be7e3b3287');
  }

  obtenerCliente() {
    this._clienteService.getCliente().subscribe(
      (data: any) => {
        this.listClient = data.data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  obtenerPaises() {
    this._clienteService.getPaises().subscribe(
      (data: any) => {
        this.listPaises = data.data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  guardarCliente() {
    const cliente: any = {
      identification: this.formLogin.get('identification')?.value,
      name: this.formLogin.get('name')?.value,
      nameCommercial: this.formLogin.get('nameCommercial')?.value,
      email: this.formLogin.get('email')?.value,
      phoneEnterprise: this.formLogin.get('phoneEnterprise')?.value,
      pageWeb: this.formLogin.get('pageWeb')?.value,
      idCity: this.formLogin.get('idCity')?.value,
      address: this.formLogin.get('address')?.value,
      twitter: this.formLogin.get('twitter')?.value,
      linkedin: this.formLogin.get('linkedin')?.value,
      instagram: this.formLogin.get('instagram')?.value,
      facebook: this.formLogin.get('facebook')?.value,
    };

    if (this.id === undefined) {
      this._clienteService.saveCliente(cliente).subscribe(
        (response: any) => {
          console.log('Cliente guardado correctamente', response);
          this.formLogin.reset();
          this.obtenerCliente(); // Actualiza la lista de clientes después de guardar
        },
        (error: any) => {
          console.error('Error al guardar el cliente', error);
        }
      );
    } else {
      cliente.id = this.id;
      this._clienteService.updateClientes(cliente.id, cliente).subscribe(
        () => {
          console.log('El cliente fue actualizado correctamente');
          this.formLogin.reset();
          this.accion = 'Agregar Cliente';
          this.id = undefined;
          this.obtenerCliente(); // Llamada añadida para actualizar la lista
        },
        (err) => {
          console.log('Hubo un error al actualizar el cliente', err);
        }
      );
    }
  }

  eliminarCliente(id: number) {
    this._clienteService.deleteCliente(id).subscribe(
      (response: any) => {
        console.log('Cliente eliminado correctamente', response);
        this.obtenerCliente(); // Actualiza la lista de clientes después de eliminar
      },
      (error: any) => {
        console.error('Error al eliminar el cliente', error);
      }
    );
  }

  editarCliente( cliente: any) {
    this.accion = 'Editar Cliente'
    this.id = cliente.id
    
    this.formLogin.patchValue({
      identification : cliente.identification,
      name : cliente.name,
      nameCommercial : cliente.nameCommercial,
      email : cliente.email,
      phoneEnterprise : cliente.phoneEnterprise,
      pageWeb : cliente.pageWeb,
      idCity : cliente.idCity,
      address : cliente.address,
      twitter : cliente.twitter,
      linkedin : cliente.linkedin,
      instagram : cliente.instagram,
      facebook : cliente.facebook,
    })
  }

  obtenerDepartamento(id: string) {
    this._clienteService.getDepartamentos(id).subscribe(
      (data: any) => {
        this.listDepartamentos = data.data;
      },
      (error: any) => {
        console.error('Error al consultar los departamentos', error);
      }
    );
  }

  obtenerCiudades(id: string) {
    this._clienteService.getCiudades(id).subscribe(
      (data: any) => {
        this.listCiudades = data.data;
      },
      (error: any) => {
        console.error('Error al consultar las ciudades', error);
      }
    );
  }

  
}
