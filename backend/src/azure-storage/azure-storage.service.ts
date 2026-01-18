import { BlobServiceClient } from "@azure/storage-blob";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class AzureStorageService {
  private blobServiceClient: BlobServiceClient;
  private containerName: string;

  constructor(private configService: ConfigService) {
    const connectionString = this.configService.get<string>(
      "AZURE_STORAGE_CONNECTION_STRING",
    );
    this.containerName =
      this.configService.get<string>("AZURE_STORAGE_CONTAINER_NAME") || "";

    if (!connectionString) {
      throw new Error("AZURE_STORAGE_CONNECTION_STRING is not defined");
    }
    if (!this.containerName) {
      throw new Error("AZURE_STORAGE_CONTAINER_NAME is not defined");
    }

    this.blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const extension = file.originalname.split(".").pop();
    const blobName = `${uuidv4()}.${extension}`;
    const containerClient = this.blobServiceClient.getContainerClient(
      this.containerName,
    );
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    try {
      await blockBlobClient.uploadData(file.buffer, {
        blobHTTPHeaders: { blobContentType: file.mimetype },
      });
      return blockBlobClient.url;
    } catch (error) {
      console.error("Error uploading to Azure Blob Storage:", error);
      throw new InternalServerErrorException("Image upload failed");
    }
  }

  async deleteFile(fileUrl: string): Promise<void> {
    try {
      const url = new URL(fileUrl);
      const pathname = url.pathname;
      const parts = pathname.substring(1).split("/");

      if (parts.length < 2) {
        console.warn(`Invalid file URL format for deletion: ${fileUrl}`);
        return;
      }

      const blobName = parts.slice(1).join("/");

      const containerClient = this.blobServiceClient.getContainerClient(
        this.containerName,
      );
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      await blockBlobClient.deleteIfExists();
    } catch (error) {
      console.error("Error deleting file from Azure Blob Storage:", error);
    }
  }
}
