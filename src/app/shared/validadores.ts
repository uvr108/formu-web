import { AbstractControl } from '@angular/forms';

export function checkRut(control: AbstractControl) : { [key: string]: boolean } | null {

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
      return { 'isValid' : true};
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
        // console.log('suma : ', suma);
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
  
    if ( +dvEsperado !== +dv) { 
      return { 'isValid' : true}; 
    }
  
    // Si todo sale bien, eliminar errores (decretar que es válido)
    return null;
  
  }
  