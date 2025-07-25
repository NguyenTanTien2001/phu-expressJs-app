/**
 * Represents a custom application error with an HTTP status code and operational flag.
 * 
 * @extends Error
 * 
 * @property {number} statusCode - The HTTP status code associated with the error.
 * @property {boolean} isOperational - Indicates if the error is operational (expected) or a programming error.
 * 
 * @example
 * throw new AppError('Resource not found', 404);
 */
export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor); // Dòng này giúp ghi lại vị trí chính xác nơi lỗi xảy ra trong chương trình và làm cho báo cáo lỗi không bị lộn xộn với những phần không cần thiết bên trong hàm tạo lỗi.
  }
}