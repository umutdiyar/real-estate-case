import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AgentDocument = HydratedDocument<Agent>;

@Schema({ timestamps: true })
export class Agent {
  @Prop({ required: true, trim: true })
  fullName!: string;

  @Prop({ required: true, unique: false, lowercase: true })
  email?: string;

  @Prop({ default: true })
  isActive!: boolean;
}

export const AgentSchema = SchemaFactory.createForClass(Agent);
