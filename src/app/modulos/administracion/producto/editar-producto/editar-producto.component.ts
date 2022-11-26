import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent {
  id:string=''
  fgvalidador: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    caracteristicas: ['', [Validators.required]],
    thumbnail: ['', [Validators.required]],
    foto: ['', [Validators.required]],
    precio: ['', [Validators.required]],
    stock: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private servicioProducto: ProductoService,
    private router : Router,
    private route : ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.BuscarProducto()
  }
  BuscarProducto(){
  this.servicioProducto.ObtenerRegistrosPorId(this.id).subscribe((datos:ModeloProducto )=>{
    this.fgvalidador.controls["id"].setValue(datos.id)
    this.fgvalidador.controls["nombre"].setValue(datos.nombre)
    this.fgvalidador.controls["descripcion"].setValue(datos.descripcion)
    this.fgvalidador.controls["caracteristicas"].setValue(datos.caracteristicas)
    this.fgvalidador.controls["thumbnail"].setValue(datos.thumbnail)
    this.fgvalidador.controls["foto"].setValue(datos.foto)
    this.fgvalidador.controls["precio"].setValue(datos.precio)
    this.fgvalidador.controls["stock"].setValue(datos.stock)
  })
}

  EditarProducto() {
    let nombre = this.fgvalidador.controls['nombre'].value;
    let descripcion = this.fgvalidador.controls['descripcion'].value;
    let caracteristicas = this.fgvalidador.controls['caracteristicas'].value;
    let thumbnail = this.fgvalidador.controls['thumbnail'].value;
    let foto = this.fgvalidador.controls['foto'].value;
    let precio = parseInt(this.fgvalidador.controls['precio'].value);
    let stock = parseInt(this.fgvalidador.controls['stock'].value);
    let p = new ModeloProducto();
    p.nombre = nombre;
    p.descripcion = descripcion;
    p.caracteristicas = caracteristicas
    p.thumbnail = thumbnail
    p.foto = foto;
    p.precio = precio;
    p.stock = stock
    p.id = this.id
    this.servicioProducto.ActulizarProducto(p).subscribe(
      (datos: ModeloProducto) => {
        alert('Producto Actualizado');
        this.router.navigate(["/administracion/buscar-producto"])
      },
      (error: any) => {
        alert('Error Actualizando El Producto');
      }
    );
  }
  EliminarProducto(){
    this.servicioProducto.EliminarProducto(this.id).subscribe((datos:ModeloProducto)=>{
      alert("Producto eliminado correctamente");
      this.router.navigate(['/administracion/buscar-producto']);
    },(error:any)=>{
      alert("Error eliminando el producto: " + error.message)
    });  
  
  }
}