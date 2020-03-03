import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../shared/rest-api.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { checkRut } from '../shared/validadores';
import { AbstractControl, ValidationErrors, FormControl} from '@angular/forms';

interface ValidatorFn {    
  (c: AbstractControl): ValidationErrors | null 
}


@Component({
  selector: 'app-voluntario-create',
  providers: [],
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
        nombre: ['', [Validators.required, Validators.pattern('^[aA-zZ]+$')]],
        apellido: ['', [Validators.required, Validators.pattern('^[aA-zZ]+$')]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$') ]],
        nacimiento: ['', [Validators.required]],
        // comuna: ['', [Validators.required]],
        // region: ['', [Validators.required]],
        // brigadista: [],
        // redes: [],
        // puertapuerta: []
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
