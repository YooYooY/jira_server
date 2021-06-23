import { IssuePriority, IssueStatus, IssueType } from "@/constans/issues";
import is from "@/utils/validation";
import striptags from "striptags";
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";
import { Project, User, Comment } from ".";

@Entity()
class Issue extends BaseEntity {
  static validations = {
    title: [is.required(), is.maxLength(200)],
    type: [is.required(), is.oneOf(Object.values(IssueType))],
    status: [is.required(), is.oneOf(Object.values(IssueStatus))],
    priority: [is.required(), is.oneOf(Object.values(IssuePriority))],
    listPosition: is.required(),
    projectId: is.required(),
    reporterId: is.required()
  };

  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  title: string;

  @Column("varchar")
  type: IssueType;

  @Column("varchar")
  status: IssueStatus;

  @Column("varchar")
  priority: IssuePriority;

  @Column("double")
  listPosition: number;

  @Column("text", { nullable: true })
  description: string | null;

  @Column("text", { nullable: true })
  descriptionText: string | null;

  @Column("int", { nullable: true })
  estimate: number | null;

  @Column("int", { nullable: true })
  timeSpend: number | null;

  @Column("int", { nullable: true })
  timeRemaining: number | null;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @Column("int")
  reporterId: number;

  @ManyToOne(
    () => Project,
    project => project.issues
  )
  project: Project;

  @Column("int")
  projectId: number;

  @OneToMany(
    () => Comment,
    comment => comment.issue
  )
  comments: Comment[];

  @ManyToMany(
    () => User,
    user => user.issues
  )
  @JoinTable()
  users: User[];

  @RelationId((issue: Issue) => issue.users)
  userIds: number[];

  @BeforeInsert()
  @BeforeUpdate()
  setDescriptionText = (): void => {
    if (this.description) {
      this.descriptionText = striptags(this.description);
    }
  };
}

export default Issue;