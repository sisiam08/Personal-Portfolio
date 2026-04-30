import { z } from "zod";
import { SkillCategory, SkillLevel } from "../../generated/prisma/enums";

export const createSkillSchema = z.object({
  body: z.object({
    name: z.string({ message: "Name is required" }),
    category: z.nativeEnum(SkillCategory, { message: "Category is required" } as any),
    level: z.nativeEnum(SkillLevel, { message: "Level is required" } as any),
    projectExperience: z.number().int().min(0, "Project experience must be positive"),
    lastUsedYear: z.number().int().min(1990).max(new Date().getFullYear()),
    summary: z.string({ message: "Summary is required" }),
  })
});

export const updateSkillSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    category: z.nativeEnum(SkillCategory).optional(),
    level: z.nativeEnum(SkillLevel).optional(),
    projectExperience: z.number().int().min(0).optional(),
    lastUsedYear: z.number().int().min(1990).max(new Date().getFullYear()).optional(),
    summary: z.string().optional(),
  })
});

export const SkillValidation = {
  createSkillSchema,
  updateSkillSchema
};
