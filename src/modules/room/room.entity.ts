import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { User } from '../user/user.entity';
import { Length } from 'class-validator';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  @Expose({ name: 'room_id' })
  id: string;

  @Column({ length: 500, nullable: false })
  @Expose({ name: 'room_name' })
  @Length(1, 500)
  name: string;

  @Column()
  @Expose({ name: 'creator_id' })
  creatorId: string;
  @ManyToOne(() => User, { nullable: false })
  @Exclude()
  creator: User;

  @CreateDateColumn({ type: 'timestamp' })
  @Expose({ name: 'created_at' })
  createdAt: Date;

  @ManyToMany(() => User, (user) => user.rooms)
  users: User[];
}
