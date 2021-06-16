import { ProjectCategory } from "@/constans/projects";
import is from "@/utils/validation";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { User } from ".";

@Entity()
class Project extends BaseEntity {
  static validations = {
    name: [is.required(), is.maxLength(100)],
    url: is.url(),
    category: [is.required(), is.oneOf(Object.values(ProjectCategory))]
  };

  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  name: string;

  @Column("varchar", { nullable: true })
  url: string | null;

  @Column("text", { nullable: true })
  description: string | null;

  @Column("varchar")
  category: ProjectCategory;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @OneToMany(
    () => User,
    user => user.project
  )
  users: User[];
}

export default Project;
