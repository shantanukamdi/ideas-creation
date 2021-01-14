import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Idea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { nullable: false, unique: true })
  title: string;

  @Column("text")
  description: string;

  @Column()
  creatorId: number;

  @ManyToOne(() => User, (u) => u.ideas)
  @JoinColumn({ name: "creatorId" })
  creator: Promise<User>;
}
