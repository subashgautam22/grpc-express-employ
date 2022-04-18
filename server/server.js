"use strict";

const path = require("path");
const dotenv = require("dotenv");
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});
console.log(path.resolve(process.cwd(), ".env"));
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const { dbHelper } = require("./helpers");
const packageDefinition = protoLoader.loadSync(
  './proto/empl_curd.rpc.proto',
  {
    keepCase: true,
    longs: "string",
    defaults: true,
    oneofs: true
  }
);
const server = new grpc.Server();
const simpleProto = grpc.loadPackageDefinition(packageDefinition);
// Grpc Methods
const simpleServiceCtl = require("./modules/simple_crud");
server.addService(
  simpleProto.example.empl_curd.rpc.SimpleCrudService.service,
  {
    create: simpleServiceCtl.create,
    update: simpleServiceCtl.update,
       get: simpleServiceCtl.get,
    get_id: simpleServiceCtl.get_id,
    delete: simpleServiceCtl.delete,
  
  }
);

server.bind(
  `${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`,
  grpc.ServerCredentials.createInsecure()
);
server.start();

if (server.started) {
  dbHelper.init();
  console.log(
    `listening to port ${process.env.GRPC_PORT}, host ${
      process.env.GRPC_HOST
    }, date: ${new Date()}`
  );
}
