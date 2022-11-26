import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar-producto.component.html',
  styleUrls: ['./eliminar-producto.component.css']
})
export class EliminarProductoComponent implements OnInit {
  id: string = '';

  fgValidador: FormGroup = this.fb.group({
    'id':['', [Validators.required]],
    'nombre':['', [Validators.required]],
    'descripcion':['', [Validators.required]],
    'caracteristicas':['', [Validators.required]],
    'precio':['', [Validators.required]],
    'stock':['', [Validators.required]],
    'foto':['', [Validators.required]],
    'thumbnail':['', [Validators.required]],
  })


  constructor(private fb: FormBuilder,private servicioProducto: ProductoService,
    private router: Router, private route: ActivatedRoute){
    

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.BuscarProducto();
      
  }


  BuscarProducto(){    
    this.servicioProducto.ObtenerRegistrosPorId(this.id).subscribe((datos: ModeloProducto)=>{
    this.fgValidador.controls["id"].setValue(this.id);
    this.fgValidador.controls["nombre"].setValue(datos.nombre);
    this.fgValidador.controls["descripcion"].setValue(datos.descripcion);
    this.fgValidador.controls["caracteristicas"].setValue(datos.caracteristicas);
    this.fgValidador.controls["precio"].setValue(datos.precio);
    this.fgValidador.controls["nombre"].setValue(datos.nombre);
    this.fgValidador.controls["stock"].setValue(datos.stock);
    this.fgValidador.controls["foto"].setValue(datos.foto);
    // this.fgValidador.controls["thumbnail"].setValue(datos.thumbnail);
  });
}


EliminarProducto(){
  this.servicioProducto.EliminarProducto(this.id).subscribe((datos:ModeloProducto)=>{
    alert("Producto eliminado correctamente");
    this.router.navigate(['/administracion/buscar-productos']);
  },(error:any)=>{
    alert("Error eliminando el producto: " + error.message)
  });  

}
}
