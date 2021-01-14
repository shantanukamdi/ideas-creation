import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Idea } from "./Idea";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { unique: true, nullable: false })
  email: string;

  @Column({ length: 20, nullable: false })
  name: string;

  @Column("text")
  password: string;

  @OneToMany(() => Idea, (t) => t.creator, { nullable: true })
  ideas: Promise<Idea[]>;
}
