import mongoose, { Document, Schema } from 'mongoose';

export type DocumentType =
  | 'manual'
  | 'receipt'
  | 'warranty'
  | 'service'
  | 'other';

export type DocumentStatus = 'processing' | 'ready' | 'failed';
export interface IHomeDocument extends Document {
  name: string;
  originalName: string;
  filePath?: string;
  mimeType: string;
  size: number;

  type: DocumentType;

  status: DocumentStatus;
  errorMessage?: string | undefined;

  extractedText: string;
  createdAt: Date;
  updatedAt: Date;

  processedAt?: Date | undefined;
  chunkCount?: number | undefined;

  metadata: {
    productName?: string;
    brand?: string;
    purchaseDate?: Date;
    warrantyExpiry?: Date;
    serviceDate?: Date;
    demo?: boolean;
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
      required: false,
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
      enum: ['manual', 'receipt', 'warranty', 'service', 'other'],
      default: 'other',
    },

    status: {
      type: String,
      enum: ['processing', 'ready', 'failed'],
      default: 'processing',
      required: true,
    },

    errorMessage: {
      type: String,
    },

    extractedText: {
      type: String,
      default: '',
    },

    processedAt: {
      type: Date,
    },

    chunkCount: {
      type: Number,
      default: 0,
    },

    metadata: {
      productName: String,
      brand: String,
      purchaseDate: Date,
      warrantyExpiry: Date,
      serviceDate: Date,
      demo: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  },
);

export const HomeDocument = mongoose.model<IHomeDocument>(
  'HomeDocument',
  documentSchema,
);
