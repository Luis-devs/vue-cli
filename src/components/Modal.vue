<template>
  <!--Inicio modal-->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel"><span v-if="opcs=='New'">Nuevo</span><span v-else>Actualizar</span> usuario</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </symbol>
                <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </symbol>
          </svg>
           <div v-if="alert_success" class="alert alert-success d-flex align-items-center" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                <div>
                    {{mensaje_alert}}
                </div>
            </div>
            <div v-if="alert_error" class="alert alert-danger d-flex align-items-center" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                <div>
                    {{mensaje_alert}}
                </div>
            </div>
          <form class="needs-validation" @submit="Validar" novalidate>
           
            <div class="modal-body">
                <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre<span class="required">*</span></label>
                    <input type="text" autocomplete="off" v-model="nombre" class="form-control" name="nombre" id="nombre" required>
                    <div class="feedback" v-if="errors[0]">{{errors[0]}}</div>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email<span class="required">*</span></label>
                    <input type="email" class="form-control" v-model="email" name="email" id="email" required>
                    <div class="feedback" v-if="errors[1]">{{errors[1]}}</div>
                </div>
                <div class="mb-3">
                    <label for="pass" class="form-label">Contraseña<span class="required">*</span></label>
                    <input type="text" autocomplete="off" v-model="pass" class="form-control" name="pass" id="pass" required>
                    <div class="feedback" v-if="errors[2]">{{errors[2]}}</div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn metronic ml-3" data-bs-dismiss="modal">
                Cancelar
                </button>
                <button type="submit" id="enviar" class="btn metronic-new"><span v-if="opcs=='New'">Guardar</span><span v-else>Actualizar</span></button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!--Fin modal-->
</template>

<script>
import peticiones_api from "@/peticiones/peticiones_api.js";
export default {
name:"Modal",

props:{
    opcs:String,
    dataAct:Array,
},
data(){
    return{
        errors:[],
        id:null,
        nombre:"",
        email:"",
        pass:"",
        opc:"",
        alert_success:false,
        alert_error:false,
        mensaje_alert:"",
    }
},

watch:{
    dataAct: function () {
        if(this.opcs=="Update"){
            //console.log("desde wacth: ",this.dataAct);
            this.id     =   this.dataAct[0].id_usuario;
            this.nombre =   this.dataAct[0].nombre;
            this.email  =   this.dataAct[0].correo;
            this.pass   =   this.dataAct[0].identificador;
            this.errors =   [];
        }
        else{
            //console.log("desde wacth else: ",this.dataAct);
            this.id     = null;
            this.nombre = "";
            this.email  = "";
            this.pass   = "";
            this.errors = [];
        }
      this.quitarEstilos();
    }
},
methods:{
    quitarEstilos(){
        
         var nombre_estilo = document.querySelectorAll('#nombre');
         var email_estilo = document.querySelectorAll('#email');
         var pass_estilo = document.querySelectorAll('#pass');
         
          Array.prototype.slice.call(nombre_estilo)
            .forEach(function (input) {
                input.classList.remove('invalid');
                input.classList.remove('valid');
            
            });
            
          Array.prototype.slice.call(email_estilo)
            .forEach(function (input) {
                input.classList.remove('valid');
                input.classList.remove('invalid');
               
            });
            
        Array.prototype.slice.call(pass_estilo)
            .forEach(function (input) {
                input.classList.remove('valid');
                input.classList.remove('invalid');
            });
    },
    ValidarEmail(validar){
        // eslint-disable-next-line no-useless-escape
        let expreValidar= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return expreValidar.test(validar);
    },
    ValidarVacio(validar){
        let expreVacio = /^\s+$/;
        return expreVacio.test(validar);
    },
    Estilos(opc, accion){
        
         var nombre_estilo = document.querySelectorAll('#nombre');
         var email_estilo = document.querySelectorAll('#email');
         var pass_estilo = document.querySelectorAll('#pass');
        if (opc=="ponerNombre" && accion==1) {
              Array.prototype.slice.call(nombre_estilo)
            .forEach(function (input) {
                input.classList.remove('valid');
                input.classList.add('invalid');
            });
        } else if(opc=="ponerNombre" && accion==0){
              Array.prototype.slice.call(nombre_estilo)
            .forEach(function (input) {
                input.classList.remove('invalid');
                input.classList.add('valid');
            });
        }
      
      if (opc=="ponerEmail" && accion==1) {
              Array.prototype.slice.call(email_estilo)
            .forEach(function (input) {
                input.classList.remove('valid');
                input.classList.add('invalid');
            });
        } else if(opc=="ponerEmail" && accion==0){
              Array.prototype.slice.call(email_estilo)
            .forEach(function (input) {
                input.classList.remove('invalid');
                input.classList.add('valid');
            });
        }
      if (opc=="ponerPass" && accion==1) {
              Array.prototype.slice.call(pass_estilo)
            .forEach(function (input) {
                input.classList.remove('valid');
                input.classList.add('invalid');
            });
        } else if(opc=="ponerPass" && accion==0){
              Array.prototype.slice.call(pass_estilo)
            .forEach(function (input) {
                input.classList.remove('invalid');
                input.classList.add('valid');
            });
        }
    },Validar(e){
      
        e.preventDefault();
        this.errors = [];
        if (this.ValidarVacio(this.nombre) || this.nombre.length==0) {
            this.errors.push("El campo nombre no puede quedar vacio.");
         this.Estilos("ponerNombre", 1);
            } else if (this.nombre.length < 3) {
            this.errors.push("El nombre debe tener mínimo 3 letras.");
            this.Estilos("ponerNombre", 1);
             }
        else{
            this.errors.push(null);
            this.Estilos("ponerNombre", 0);
            }
        if (this.ValidarVacio(this.email) || this.email.length==0) {
            this.errors.push("El campo email no puede quedar vacio.");
            this.Estilos("ponerEmail", 1);
        } else if (!this.ValidarEmail(this.email)) {
            this.errors.push("Email inválido.");
            this.Estilos("ponerEmail", 1);
        }
        else{
            this.errors.push(null);
            this.Estilos("ponerEmail", 0);
        }
        
        if (this.ValidarVacio(this.pass) || this.pass.length==0) {
            this.errors.push("El campo contraseña no puede quedar vacio.");
            this.Estilos("ponerPass", 1);
        } else if (this.pass.length < 5) {
            this.errors.push("La contraseña debe tener mínimo 5 letras.");
            this.Estilos("ponerPass", 1);
        }
        else{
            this.errors.push(null);
            this.Estilos("ponerPass", 0);
        }
      
       if (!this.errors[0] && !this.errors[1] && !this.errors[2]) {
           document.getElementById("enviar").disabled=true;
           if(!this.id){
               peticiones_api.crear({
                    nombre: this.nombre,
                    correo:this.email,
                    pass:this.pass,
                    }).then(response => {
                        if (response[0].status) {
                            this.quitarEstilos();
                            this.id     = null;
                            this.nombre = "";
                            this.email  = "";
                            this.pass   = "";
                            this.errors = [];
                            this.$emit("consultar");
                            this.alert_success=true;
                            this.mensaje_alert="Usuario registrado correctamente.";
                            setTimeout(() => {
                                this.alert_success=false;
                                document.getElementById("enviar").disabled=false;
                                 
                            }, 1900);
                            console.log(response);
                        } else {
                            this.alert_error=true;
                            this.mensaje_alert="No se pudo registrar el usuario, intenté nuevamente.";
                            setTimeout(() => {
                                this.alert_error=false;
                                
                            }, 1900);
                            document.getElementById("enviar").disabled=false;
                            console.log(response[0].info);
                        }
                    });
           }
           else{
               peticiones_api.actualizar({
                    id: this.id,
                    nombre: this.nombre,
                    correo:this.email,
                    pass:this.pass,
                    }).then(response=>{
                        if(response[0].status){
                            this.errors = [];
                            this.$emit("consultar");
                            this.alert_success=true;
                            this.mensaje_alert="Usuario actualizado correctamente.";
                            
                            setTimeout(() => {
                                this.alert_success=false;
                                document.getElementById("enviar").disabled=false;
                            this.quitarEstilos();
                            }, 1900);
                            console.log(response);
                        }
                        else{
                             this.alert_error=true;
                            this.mensaje_alert="No se pudo actualizar el usuario, intenté nuevamente.";
                            setTimeout(() => {
                                this.alert_error=false;
                                document.getElementById("enviar").disabled=false;
                            }, 1900);
                            console.log(response[0].info);
                        }
                    });
           }
        }
      
    }
    },
computed:{
    
}
}
</script>

<style>
.required{
    color: #dc3545;
}
.feedback{
    width: 100%;
    margin-top: 0.25rem;
    font-size: .875em;
    color: #dc3545;
}
.valid{
    border: 1px solid #198754!important;
    transition: all 0.5s ease-out;
}
.invalid{
    border: 1px solid #dc3545!important;
}
.modal-content{
    border-radius: 1.1rem!important;
}
.alert {
    padding: 0.7rem 1rem!important;
    margin-bottom: 0!important;
    transition: display 1s ease-in!important;
}
</style>