<template>
  <div class="hello">
    
    <div>
      <div v-for="i in errors" :key="i">{{ i }}</div>
    </div>
    <a data-bs-toggle="modal" @click="Nuevo('New')" data-bs-target="#exampleModal" class="btn metronic-new btn-sm btn-flex btn-active-primary fw-bolder mt-4">
        Nuevo
      </a>
    <br>
    <div v-if="datos" class="table-responsive">
      
      <table class="table table-borderless table-hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Identificador</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuario in datos" :key="usuario">
            <td>{{ usuario.id_usuario }}</td>
            <td>{{ usuario.nombre }}</td>
            <td>{{ usuario.correo }}</td>
            <td>{{ usuario.identificador }}</td>
            <td>
              <!--<div class="btn-group" role="group">
                <button type="button" class="btn btn-outline-success" @click="actualizar(usuario.id)">
                  Actualizar
                </button>
                <button type="button" class="btn btn-outline-danger" @click="eliminar(usuario.id)">
                  Eliminar
                </button>
              </div>-->
              <div class="d-flex align-items-center gap-2 gap-lg-3">
                <!--begin::Filter menu-->
                <div class="m-0">
                  <!--begin::Menu toggle-->
                  <a @click="actualizar(usuario.id_usuario)" data-bs-target="#exampleModal" data-bs-toggle="modal" class="btn metronic btn-sm btn-flex btn-light btn-active-primary fw-bolder">
                    Actualizar
                  </a>
                  <a @click="eliminar(usuario.id_usuario)" class="btn metronic btn-sm btn-flex btn-light btn-active-primary fw-bolder">
                    Eliminar
                  </a>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else><span>Sin datos.</span></div>
   <Modal :opcs="volver" :dataAct="volverData" @consultar="consultar" />
    
  </div>
</template>

<script>
//import $ from "jquery";
import peticiones_api from "@/peticiones/peticiones_api.js";
import Modal from "@/components/Modal.vue";
export default {
  name: "HelloWorld",
  components:{
    Modal,
  },
  data() {
    return {
      datos: [],
      errors: [],
      opc:"",
      datosAct:[],
    };
  },
  created: function () {
    this.consultar();
  },
  methods: {
    crear(){
      peticiones_api.crear();
    },
    consultar() {
      peticiones_api.leer().then((response) => {
        this.datos = response;
      });
    },
    actualizar(id) {
      this.opc="Update";
      this.datosAct=[];
      this.datosAct=this.datos.filter(index => {
        return index.id_usuario == id;
      });
    
    },
    eliminar(id) {
      alert(id);
    },
    Nuevo(org){
      this.opc=org;
      this.datosAct=[];
    },
  },

  computed: {
    volver(){
     return this.opc;
    },
    volverData(){
      return this.datosAct;
    }
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.btn.metronic {
  border: 0;
  padding: 6px 12px;
  color: #7e8299;
  border-color: #f5f8fa;
  background-color: #f5f8fa;
  font-weight: 600 !important;
  font-size: 0.925rem;
  border-radius: 0.475rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.btn.metronic:hover,
.btn.metronic:focus {
  color: #fff;
  background-color: #009ef7;
}
.btn.metronic-new:disabled{
  cursor: no-drop!important;
  pointer-events: all!important;
}
.btn.metronic-new {
  color: #fff!important;
  background-color: #009ef7;
  font-weight: 600 !important;
  font-size: 0.925rem;
  border: 0;
  border-radius: 0.475rem;
  float: right;
}

</style>
