import fs from 'fs';
import express from 'express';
import { createServer } from 'vite';
import apiHandler from './api/apihandler.js'
import ViteExpress from "vite-express";
import Model from './serverFiles/model.js';
//import Model from './serverFiles/model.ts'
console.log("Starting up server")
const app = express();

apiHandler(app)

//const model = Model.PredictModel(Model.PrepData([[1,2],[3,4,5]]))

//model.print()

//Model.PrepData([[1,2],[3,4,5]]).print()

Model.LoadDB("C:\\Cjs data folder\\GIT\\School Finder\\db\\model","C:\\Cjs data folder\\GIT\\School Finder\\db",true)
 
ViteExpress.listen(app, 3000, () => console.log("http://localhost:3000"));
