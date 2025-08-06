import { Router } from 'express';
import multer from 'multer';
import {
  uploadFileHandler,
  getFilesHandler,
  downloadFileHandler,
  deleteFileHandler,
} from '../controllers/file.controller';
import { authenticator } from '../middlewares/auth'; // Assuming auth middleware exists
import { fileActionParamsSchema, uploadFileSchema } from '../schemas/file.schema';
import { validate } from '../middlewares/validateResource';

const fileRouter = Router();

// Configure multer to use memory storage instead of disk storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * @openapi
 * /files:
 *   post:
 *     summary: Upload a new file to MongoDB GridFS
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - File
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *               - todoItemId
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload.
 *               todoItemId:
 *                  type: string
 *                  required: true
 *                  description: The ID of the TodoItem to link this file to.
 *     responses:
 *       201:
 *         description: File uploaded successfully. Returns the file's metadata.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/File'
 *       400:
 *         description: Bad Request. The 'file' field is missing from the form data.
 *       401:
 *         description: Unauthorized.
 */
fileRouter.post('/', authenticator, upload.single('file'), validate(uploadFileSchema), uploadFileHandler);

/**
 * @openapi
 * /files:
 *   get:
 *     summary: Get metadata for all files
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - File
 *     responses:
 *       200:
 *         description: A list of all file metadata objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/File'
 *       401:
 *         description: Unauthorized.
 */
fileRouter.get('/', authenticator, getFilesHandler);

/**
 * @openapi
 * /files/{id}/download:
 *   get:
 *     summary: Download a file's content by its metadata ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - File
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The metadata ID of the file to download.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The raw file content.
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: File not found.
 */
fileRouter.get('/:id/download', authenticator, validate(fileActionParamsSchema), downloadFileHandler);

/**
 * @openapi
 * /files/{id}:
 *   delete:
 *     summary: Delete a file by its metadata ID
 *     description: This will delete both the file's metadata and its content from GridFS.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - File
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The metadata ID of the file to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: File deleted successfully. Returns the metadata of the deleted file.
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          example: File deleted successfully.
 *                      file:
 *                          $ref: '#/components/schemas/File'
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: File not found.
 */
fileRouter.delete('/:id', authenticator, validate(fileActionParamsSchema), deleteFileHandler);

export default fileRouter;