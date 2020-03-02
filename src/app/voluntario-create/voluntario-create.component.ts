import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../shared/rest-api.service';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
// import { AbstractControl } from '@angular/forms';

export function checkRut(control: FormControl) {

  // Despejar Puntos

  let rut = control.value;
  let re = /\./gi;
  let valor = rut.replace(re, '');
  // Despejar Guión

  re = /-/gi;
  valor = valor.replace(re, '');

  // Aislar Cuerpo y Dígito Verificador
  const cuerpo: string = valor.slice(0, -1);

  console.log('Cuerpo y Valor', cuerpo, valor);

  let dv = valor.slice(-1).toUpperCase();
  console.log(dv);
    // Formatear RUN
  rut = cuerpo + '-' + dv;

  // Si no cumple con el mínimo ej. (n.nnn.nnn)
  if (cuerpo.length < 7) {
    return false;
  }

  // Calcular Dígito Verificador
  let suma = 0;
  let multiplo = 2;
  let index: number;
  let dvEsperado: number;

  // Para cada dígito del Cuerpo
  for ( let i = 1; i  <= cuerpo.length; i++) {

      // Obtener su Producto con el Múltiplo Correspondiente
      // console.log('xxx : ', +valor.charAt(cuerpo.length - i));
       index = multiplo * +valor.charAt(cuerpo.length - i);

      // Sumar al Contador General
       suma = suma + index;
       console.log('suma : ', suma);
      // Consolidar Múltiplo dentro del rango [2,7]
       if ( multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }

  }

  // Calcular Dígito Verificador en base al Módulo 11
  dvEsperado = 11 - ( suma % 11);
  console.log('dv', dv);


   // Casos Especiales (0 y K)
  dv = (dv === 'K') ? '10' : dv;
  dv = (dv === '0') ? '11' : dv;
  console.log('dv', dv, dvEsperado);


  // Validar que el Cuerpo coincide con su Dígito Verificador
  if ( +dvEsperado !== +dv) { return null; }

  // Si todo sale bien, eliminar errores (decretar que es válido)
  return true;

}

@Component({
  selector: 'app-voluntario-create',
  templateUrl: './voluntario-create.component.html',
  styleUrls: ['./voluntario-create.component.css']
})




export class VoluntarioCreateComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

    constructor(
      public restApi: RestApiService,
      public router: Router,
      private fb: FormBuilder
    ) { }

    ngOnInit() {

    this.registerForm = this.fb.group({
        rut: ['', [Validators.required, Validators.minLength(8), checkRut]],
        nombre: ['', [Validators.required]],
        apellido: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern]],
        nacimiento: ['', [Validators.required]],
        comuna: ['', [Validators.required]],
        region: ['', [Validators.required]],
        brigadista: [],
        redes: [],
        puertapuerta: []
      });


     }

    get f() { return this.registerForm.controls; }

    onSubmit() {
      this.submitted = true;
      console.log(this.registerForm.value);
      // console.log(this.checkRut(this.voluntarioDetails.rut));

      // this.restApi.createVoluntario(this.voluntarioDetails).subscribe((data: {}) => {
      //   this.router.navigate(['/lista-voluntario']);
      // });

      if (this.registerForm.invalid) {
        return;
    }

      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
    }


}
