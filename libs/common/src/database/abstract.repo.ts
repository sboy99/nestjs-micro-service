import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export class AbstractRepo<TDocument extends AbstractDocument> {
  protected readonly logger: Logger;
  constructor(protected readonly model: Model<TDocument>) {}

  /**
   * Create a new document
   */
  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const newDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    const createdDocument = await newDocument.save();
    return createdDocument.toObject();
  }
  /**
   * List all documents
   */
  async list(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    const documents = await this.model.find(filterQuery, {}, { lean: true });
    return documents as TDocument[];
  }
  /**
   * Filter one document
   */
  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      this.logger.warn(`No document was found for filter query: `, filterQuery);
      throw new NotFoundException('No document was found');
    }

    return document as TDocument;
  }
  /**
   * Filter one docuement and update
   */
  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });

    if (!document) {
      this.logger.warn(`No document was found for filter query: `, filterQuery);
      throw new NotFoundException('No document was found');
    }

    return document as TDocument;
  }
  /**
   * Filter one docuement and delete
   */
  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model.findOneAndDelete(filterQuery, {
      lean: true,
      new: true,
    });

    if (!document) {
      this.logger.warn(`No document was found for filter query: `, filterQuery);
      throw new NotFoundException('No document was found');
    }

    return document as TDocument;
  }
}
