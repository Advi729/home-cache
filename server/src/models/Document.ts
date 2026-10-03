import mongoose, { Document, Schema } from "mongoose";

export type DocumentType =
  | "manual"
  | "receipt"
  | "warranty"
  | "service"
  | "other";

export interface IHomeDocument extends Document {
  name: string;
  originalName: string;
  filePath: string;
  mimeType: string;
  size: number;

  type: DocumentType;

  extractedText: string;

  metadata: {
    productName?: string;
    brand?: string;
    purchaseDate?: Date;
    warrantyExpiry?: Date;
    serviceDate?: Date;
  };
}

const documentSchema = new Schema<IHomeDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    originalName: {
      type: String,
      required: true,
    },

    filePath: {
      type: String,
      required: true,
    },

    mimeType: {
      type: String,
      required: true,
    },

    size: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      enum: ["manual", "receipt", "warranty", "service", "other"],
      default: "other",
    },

    extractedText: {
      type: String,
      default: "",
    },

    metadata: {
      productName: String,
      brand: String,
      purchaseDate: Date,
      warrantyExpiry: Date,
      serviceDate: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const HomeDocument = mongoose.model<IHomeDocument>(
  "HomeDocument",
  documentSchema
);