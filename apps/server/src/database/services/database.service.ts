import { Injectable } from "@nestjs/common";

type QueryOptions = {
  transition?: string;
};

@Injectable()
export class DatabaseService {
  constructor() {}

  query(options: QueryOptions) {}
}
