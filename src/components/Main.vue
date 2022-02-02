<template>
<div>
    <div class="pb-4 mt-4">
      <a data-bs-toggle="modal" @click="Nuevo('New')" data-bs-target="#exampleModal" class="btn metronic-new btn-sm btn-flex btn-active-primary fw-bolder">
        Nuevo
      </a>
    </div>
  <div>
    <br />
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
              
              <div class="d-flex align-items-center gap-2 gap-lg-3">
                <!--begin::Filter menu-->
                <div class="m-0">
                  <!--begin::Menu toggle-->
                  <a @click="actualizar(usuario.id_usuario)" data-bs-target="#exampleModal" data-bs-toggle="modal" class="btn metronic btn-sm btn-flex btn-light btn-active-primary fw-bolder">
                    Actualizar
                  </a>
                  <a @click="eliminaruser(usuario.id_usuario)" class="btn metronic btn-sm btn-flex btn-light btn-active-primary fw-bolder">
                    Eliminar <span class="px-1"></span>
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
</div>
</template>

<script>
//import $ from "jquery";
import peticiones_api from "@/peticiones/peticiones_api.js";
import Modal from "@/components/Modal.vue";
import Swal from "sweetalert2";
export default {
  name: "Main",
  components: {
    Modal,
  },
  data() {
    return {
      datos: [],
      opc: "",
      datosAct: [],
    };
  },
  created: function () {
    this.consultar();
  },
  methods: {
    consultar() {
      peticiones_api.leer().then(response => {
        this.datos = response;
      });
    },
    actualizar(id) {
      this.opc = "Update";
      this.datosAct = [];
      this.datosAct = this.datos.filter((index) => {
        return index.id_usuario == id;
      });
    },
    eliminaruser(id) {
      Swal.fire({
        title: "¿Quieres eliminar este usuario?",
        text: "¡Esta acción no se podrá deshacer!",
        icon: "warning",
        iconColor: "red",
        focusCancel: true,
        showCancelButton: true,
        confirmButtonText: "Si, eliminar.",
        cancelButtonText: "No, cancelar.",
        
      }).then(result => {
        if (result.isConfirmed) {
          peticiones_api.eliminar({id:id}).then(response=> {
            if (response[0].status) {
              Swal.fire({
                title: "Usuario eliminado.",
                text: "Ha sido eliminado el registro del usuario.",
                icon: "success",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 1600,
              });
              this.consultar();
            } else{
              Swal.fire({
                title: "Error al eliminar.",
                text: "No se pudo eliminar el usuario, intenté nuevamente.",
                icon: "error",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 1600,
              });
              console.log(response[0].info);
            }
          });
        }
      });
    },
    Nuevo(org) {
      this.opc = org;
      this.datosAct = [];
    },
  },

  computed: {
    volver() {
      return this.opc;
    },
    volverData() {
      return this.datosAct;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.swal2-confirm.swal2-styled {
  color: #fff !important;
  background-color: #009ef7 !important;
  font-weight: 600 !important;
  font-size: 0.925rem !important;
  border: 0 !important;
  border-radius: 0.475rem !important;
  padding: 6px 12px !important;
}
.swal2-cancel.swal2-styled,
.btn.metronic {
  margin-top: 3px!important;
  border: 0 !important;
  padding: 6px 12px !important;
  color: #7e8299 !important;
  border-color: #f5f8fa;
  background-color: #f5f8fa !important;
  font-weight: 600 !important;
  font-size: 0.925rem !important;
  border-radius: 0.475rem !important;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out !important;
}
.btn.metronic:hover,
.btn.metronic:focus,
.swal2-cancel.swal2-styled:hover,
.swal2-cancel.swal2-styled:focus {
  color: #fff !important;
  background-color: #009ef7 !important;
}
.btn.metronic-new:disabled {
  cursor: no-drop !important;
  pointer-events: all !important;
}
.btn.metronic-new {
  color: #fff !important;
  background-color: #009ef7;
  font-weight: 600 !important;
  font-size: 0.925rem;
  border: 0;
  border-radius: 0.475rem;
  float: right;
}
</style>
