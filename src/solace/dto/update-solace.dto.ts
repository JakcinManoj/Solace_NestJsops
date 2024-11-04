import { PartialType } from '@nestjs/mapped-types';
import { CreateSolaceDto } from './create-solace.dto';

export class UpdateSolaceDto extends PartialType(CreateSolaceDto) {}
