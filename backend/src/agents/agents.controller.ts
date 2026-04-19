import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('agents')
@Controller('agents')
export class AgentsController {}
