import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { observable } from 'rxjs';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css'],
})
export class CrearProductoComponent implements OnInit {
  fgvalidador: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    caracteristicas: ['', [Validators.required]],
    //  
    foto: ['', [Validators.required]],
    precio: ['', [Validators.required]],
    stock: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private servicioProducto: ProductoService,
    private router : Router
  ) {}
  ngOnInit(): void {

  }

  GuardarProducto() {
    let nombre = this.fgvalidador.controls['nombre'].value;
    let descripcion = this.fgvalidador.controls['descripcion'].value;
    let caracteristicas = this.fgvalidador.controls['caracteristicas'].value;
    // let thumbnail = this.fgvalidador.controls['thumbnail'].value;
    let foto = this.fgvalidador.controls['foto'].value;
    let precio = parseInt(this.fgvalidador.controls['precio'].value);
    let stock = parseInt(this.fgvalidador.controls['stock'].value);
    let p = new ModeloProducto();
    p.nombre = nombre;
    p.descripcion = descripcion;
    p.caracteristicas = caracteristicas
    // p.thumbnail = thumbnail
    p.foto = foto;
    p.precio = precio;
    p.stock = stock
    this.servicioProducto.CrearProducto(p).subscribe(
      (datos: ModeloProducto) => {
        alert('Producto creado');
        this.router.navigate(["/administracion/buscar-producto"])
      },
      (error: any) => {
        alert('error creando producto');
      }
    );
  }
}
