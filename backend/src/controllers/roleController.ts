import { Request, Response } from 'express';
import prisma from '../prisma';

export const getAllRoles = async (req: Request, res: Response) => {
  try {
    const roles = await prisma.role.findMany();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch roles' });
  }
};

export const addRole = async (req: Request, res: Response) => {
  try {
    const { name, permissions } = req.body;
    const newRole = await prisma.role.create({
      data: { name, permissions },
    });
    res.status(201).json(newRole);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add role' });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, permissions } = req.body;
    const updatedRole = await prisma.role.update({
      where: { id: Number(id) },
      data: { name, permissions },
    });
    res.status(200).json(updatedRole);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update role' });
  }
};

export const deleteRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.role.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete role' });
  }
};
