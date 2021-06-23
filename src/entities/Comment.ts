import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  ObjectType,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import is from "@/utils/validation";
import User from "./User";
import Issue from "./Issue";

@Entity()
class Comment extends BaseEntity {
  static validations = {
    body: [is.required(), is.maxLength(50000)],
    userId: is.required(),
    issueId: is.required()
  };

  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  body: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updateAt: Date;

  @ManyToOne(
    () => User,
    user => user.comments
  )
  user: User;

  @Column("int")
  userId: number;

  @ManyToOne(
    () => Issue,
    issue => issue.comments,
    { onDelete: "CASCADE" }
  )
  issue: Issue;

  @Column("int")
  issueId: number;
}

export default Comment;
