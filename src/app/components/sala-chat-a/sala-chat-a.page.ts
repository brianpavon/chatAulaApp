import { Component, OnInit } from '@angular/core';
import { Mensajes } from 'src/app/interfaces/mensajes';
import { AuthService } from 'src/app/services/auth.service';
import { MensajesService } from 'src/app/services/mensajes.service';

@Component({
  selector: 'app-sala-chat-a',
  templateUrl: './sala-chat-a.page.html',
  styleUrls: ['./sala-chat-a.page.scss'],
})
export class SalaChatAPage implements OnInit {
  mensajeNuevo:string = '';
  arrayMensajes:Mensajes[]=[];  
  isLogged:boolean = false;
  chatOn:boolean = false;
  usuarioLogueado : any;

  constructor(private auth : AuthService,private servMsj : MensajesService) { }

  ngOnInit() {
    this.auth.obtenerUsuarioLogueado().subscribe(
      user => {
        user ? this.isLogged = true : this.isLogged = false;
        this.usuarioLogueado = user;
      }
    )
    this.cargarMensajes();
  }

  ngAfterViewChecked():void{
    //this.scrollAlUltimo();
  }

  enviarMensaje(){
    if(this.mensajeNuevo == '') return;
    //console.log(this.mensajeNuevo);
    let date = new Date();
    let dateString = date.toString();
    //sacamos el nombre del mail
    let indice = this.usuarioLogueado.email.indexOf("@");    
    let nombre = this.usuarioLogueado.email.substring(0, indice);

    let nuevoMsj ={
      id:this.arrayMensajes.length+1,
      nombre: nombre,
      emisor:this.usuarioLogueado.uid,
      texto: this.mensajeNuevo,
      fecha: dateString,
      curso:'A'
    }    
    this.servMsj.guardarMensaje(nuevoMsj);
    this.mensajeNuevo = "";
    // setTimeout(() => {
    //   this.scrollAlUltimo();
    // }, 20);
  }

  // scrollAlUltimo(){
  //   let todosLosMsj:any = document.getElementsByClassName('msjChat');    
  //   let ultimoMsj :any = todosLosMsj[(todosLosMsj.length - 1)];
  //   let posicionSuperior;
  //   if(ultimoMsj){
  //     posicionSuperior = ultimoMsj.offsetTop;
  //   }

  //   //@ts-ignore
  //   document.getElementById('contenedorMsj')?.scrollTop = posicionSuperior;
  // }

  cargarMensajes(){
    this.servMsj.traerTodosLosMensajes('A').subscribe(
      mensajes=>{
        //console.log(mensajes);
        this.arrayMensajes = mensajes;
        this.ordenarMensajes();        
      }
    )    
  }

  ordenarMensajes(){
   
    this.arrayMensajes.sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      
      return 0;
    });
  }

}
