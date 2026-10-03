import mongoose, {
  Document,
  Schema,
  Types,
} from "mongoose";

export interface IDocumentChunk extends Document {
  documentId: Types.ObjectId;
  content: string;
  embedding: number[];
  chunkIndex: number;
}

const documentChunkSchema =
  new Schema<IDocumentChunk>(
    {
      documentId: {
        type: Schema.Types.ObjectId,
        ref: "HomeDocument",
        required: true,
        index: true,
      },

      content: {
        type: String,
        required: true,
      },

      embedding: {
        type: [Number],
        required: true,
      },

      chunkIndex: {
        type: Number,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

export const DocumentChunk =
  mongoose.model<IDocumentChunk>(
    "DocumentChunk",
    documentChunkSchema
  );