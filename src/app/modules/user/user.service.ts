import { prisma } from "../../shared/prisma";
import bcrypt from "bcryptjs";
import { CreatePatientInput } from "./user.interface";

type TxClient = Parameters<typeof prisma.$transaction>[0] extends (
  tx: infer T,
) => any
  ? T
  : never;

const createPatient = async (payload: CreatePatientInput) => {
  const saltRounds = Number(process.env.SALT_ROUND) || 10;
  const hashPassword = await bcrypt.hash(payload.password, saltRounds);

  // const user = await prisma.user.findMany();
  const result = await prisma.$transaction(async (tx: TxClient) => {
    await tx.user.create({
      data: {
        email: payload.email,
        password: hashPassword,
        status: "ACTIVE",
      },
    });

    return tx.patient.create({
      data: {
        name: payload.name,
        email: payload.email,
      },
    });
  });

  return result;
};

export const UserService = { createPatient };
