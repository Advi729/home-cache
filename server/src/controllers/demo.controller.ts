import { Request, Response } from "express";

import { seedDemoMemory } from "../services/demo/seedDemoMemory.js";

export const startDemo = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await seedDemoMemory();

    res.json({
      success: true,
      message: result.seeded
        ? "Demo memory created."
        : "Demo memory already exists.",
      data: {
        seeded: result.seeded,

        documents: result.documents.map(
          (document) => ({
            id: document._id,
            name: document.name,
            type: document.type,
            status: document.status,
          })
        ),
      },
    });
  } catch (error) {
    console.error(
      "Failed to start demo:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to prepare the demo memory.",
    });
  }
};