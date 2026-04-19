import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Agent, AgentDocument } from './schemas/agent.schema';
import { CreateAgentDto } from './dto/create-agent.dto';

@Injectable()
export class AgentsService {
  constructor(
    @InjectModel(Agent.name)
    private agentModel: Model<AgentDocument>,
  ) {}

  async create(createAgentDto: CreateAgentDto): Promise<Agent> {
    const agent = new this.agentModel(createAgentDto);
    return agent.save();
  }

  async findAll(): Promise<Agent[]> {
    return this.agentModel.find().sort({ createdAt: -1 });
  }

  async findById(id: string): Promise<Agent> {
    const agent = await this.agentModel.findById(id);

    if (!agent) {
      throw new NotFoundException('Temsilci Bulunamadı!');
    }
    return agent;
  }
}
