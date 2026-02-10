import { prisma } from "../../shared/prisma";
import bcrypt from "bcryptjs";
import { CreatePatientInput } from "./user.interface";
import { Request } from "express";
import { fileUploader } from "../../helper/fileUploader";

type TxClient = Parameters<typeof prisma.$transaction>[0] extends (
  tx: infer T,
) => any
  ? T
  : never;

const createPatient = async (req: Request) => {

  if(req.file){
    const uploadResult = await fileUploader.uploadToCloudinary(req.file)
    console.log(uploadResult)
  }

  // const saltRounds = Number(process.env.SALT_ROUND) || 10;
  // const hashPassword = await bcrypt.hash(req.body.password, saltRounds);

  // // const user = await prisma.user.findMany();
  // const result = await prisma.$transaction(async (tx: TxClient) => {
  //   await tx.user.create({
  //     data: {
  //       email: req.body.email,
  //       password: hashPassword,
  //       status: "ACTIVE",
  //     },
  //   });

  //   return tx.patient.create({
  //     data: {
  //       name: req.body.name,
  //       email: req.body.email,
  //     },
  //   });
  // });

  // return result;
};

export const UserService = { createPatient };
