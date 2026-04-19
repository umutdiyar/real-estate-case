import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AgentDocument = Agent & Document;

@Schema({ timestamps: true })
export class Agent {
  @Prop({ required: true })
  fullName!: string;

  @Prop()
  email?: string;

  @Prop({ default: true })
  isActive!: boolean;
}

export const AgentSchema = SchemaFactory.createForClass(Agent);
