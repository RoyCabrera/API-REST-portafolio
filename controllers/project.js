'use strict'
var Project = require('../models/project');
var fs = require('fs');
var path = require('path');
//  CONTROLADOR ES UNA VARIABLE JSON CON FUNCIONES

var ProjectController = {
    home:function(req,res){
        return res.status(200).send({
            message:"SOY EL HOME"
        });
    },
    test:function(req,res){
        return res.status(200).send({
           message:"soy el test" 
        });
    },
    saveProject:function(req,res){
        
        var project = new Project();
        var params = req.body;
        
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.langs = params.langs;
        project.year = params.year;
        project.image = params.image;

        project.save((err,ProjectStored)=>{
            if(err){
                return res.status(500).send({message:"error al guardar documento"});
            }
            if(!ProjectStored){
                return res.status(404).send({message:"No se a podido gurdar el documento"});
            }

            return res.status(200).send({project:ProjectStored});
        });
    },
    getProject:(request,response)=>{

        var ProjectId = request.params.id;

        /* EL MODELO TIENE LOS MÉTODOS PARA LISTAR,GUARDAR,BORRAR Y ACTUALIZAR */
        Project.findById(ProjectId,(err,project)=>{
            if(err){
                return response.status(500).send({message:"error al buscar documento"});
            }
            if(!project){
                return response.status(404).send({message:"No se pudo encontrar el documento"});
            }
                return response.status(200).send({
                    project
                })
        });
    },
    getProjects:(req,res)=>{

        Project.find({}).exec((error,projects)=>{

            if(error){
                return res.status(200).send({message:"Erro no se pudo completar la acción"});
            }
            if(!projects){
                return res.status(200).send({message:"No se encontraron documentos"});
            }
            return res.status(200).send({
                projects
            });
        });
    },
    updateProject:(req,res)=>{
        
        var ProjectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(ProjectId,update,{new:true},(err,projectUpdate)=>{
            if(err){
                return res.status(500).send({
                    message:"No se pudo actualizar"
                });
            }
            if(!projectUpdate){
                return res.status(404).send({
                    message:"Error al actualizar el documento"
                })
            }
            return res.status(200).send({project:projectUpdate});
        });
    },
    deleteProject:(req,res) => {
        var projecetId= req.params.id;

        Project.findByIdAndDelete(projecetId,(err,projectDelete)=>{
            return res.status(200).send({
                project:projectDelete
            });
        });
    },
    uploadImage:(req,res)=>{


        var projecetId = req.params.id;
        var fileName = 'Imagen no subida';
        if(req.files){

            var filePath = req.files.image.path;    // GUARDANDO EL PATH DE LA IMAGEN SUBIDA
            var fileSplit = filePath.split('\\');   // RECORTANDO SOLO EL NOMBRE DE LA IMAGEN
            var fileName = fileSplit[1];            // OBTENIENDO EL NOMBRE FINAL
            var extFileName = fileName.split('\.'); // RECORTAR PARA VALIDAR SI ES IMAGEN
            var extSplit = extFileName[1];
            //  VALIDAR SI EL ARCHIVO ES UNA IMAGEN
            if(extSplit == 'jpg' || extSplit == 'png' || extSplit == 'gif' || extSplit == 'jpeg'){

                // GUARDAR LA IMAGEN 
                Project.findByIdAndUpdate(projecetId,{image:fileName},{new:true},(err,projectUpdate)=>{
                    return res.status(200).send({
                        project:projectUpdate
                    });
                });

            }
            //  eliminar la imagen no se subio
            else{
                fs.unlink(filePath,(err)=>{
                    return res.status(200).send({
                        message:"Solo esta permitido subir imagenes"
                    });
                });
            }
        }
        else{
            return res.status(200).send({
                message:"no se han subido archivos"
            })
        }
    },
    getImageFile: (req,res) => {
        var file = req.params.image;
        var path_file = "./upload/"+file;

        fs.exists(path_file,(exists) =>{
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }
            else{
                return res.status(200).send({
                    message:"No existe la imagen"
                })
            }
        })
    }
    
}


module.exports = ProjectController;